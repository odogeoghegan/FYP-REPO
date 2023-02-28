import React, { Fragment, useRef, useState } from 'react'
import _app from "../../src/pages";
import { useRecoilState } from "recoil";
import { modalState } from '../../atoms/modalAtom';
import { Dialog, Transition } from '@headlessui/react';
import { useSession } from "next-auth/react";
import { v4 as uuidv4 } from "uuid";
import {
  BiCamera, BiPlus
} from "react-icons/bi";
import { api } from "../../src/utils/api";
import { supabase } from '../../src/server/supabase';
import { PrismaClient } from '@prisma/client';

const [title, setTitle] = React.useState("");
const { data: session, status } = useSession();

const [open, setOpen] = useRecoilState(modalState);
const filePickerRef = React.useRef<HTMLInputElement>(null);
const [loading, setLoading] = React.useState(false);
const [selectedFile, setSelectedFile] = React.useState("");

//testing recipes form
const [postType, setPostType] = useState('basic');
const [ingredients, setIngredients] = useState([""]);
const [steps, setSteps] = useState([""]);

const addImageToPost = (e: React.ChangeEvent<HTMLInputElement>) => {
  const reader = new FileReader();
  if (e.target.files && e.target.files[0]) {
    reader.readAsDataURL(e.target.files[0]);
  }
  reader.onload = (readerEvent) => {
    if (readerEvent.target) {
      setSelectedFile(readerEvent.target?.result as string);
    }
  }
}

const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
  // if (loading) return;
  // setLoading(true);
  let file;

  if (e.target.files) {
    file = e.target.files[0];
  }

  const { data, error } = await supabase
  .storage
  .from("images")
  .upload(session?.user?.id + "/" + uuidv4(), file as File)

  if (data) {
    console.log(data);
  } else if (error) {
    console.log(error);
  }
}

const handleIngredientChange = (index: number, value: string) => {
  setIngredients((prevIngredients) => {
    const newIngredients = [...prevIngredients];
    newIngredients[index] = value;
    return newIngredients;
  });
};

const handleStepChange = (index: number, value: string) => {
  setSteps((prevSteps) => {
    const newSteps = [...prevSteps];
    newSteps[index] = value;
    return newSteps;
  });
};

//testing recipes form
const addIngredient = () => {
  setIngredients((prevIngredients) => [...prevIngredients, ""]);
};
//testing recipes form
const addStep = () => {
  setSteps((prevSteps) => [...prevSteps, ""]);
};

const utils = api.useContext();
const uploadPost = api.post.create.useMutation({
  onMutate: async (newEntry) => {
    await utils.post.getAll.cancel();
    console.log("Added new entry: " + newEntry.title);
  },
  onSettled: async () => {
    await utils.post.getAll.invalidate();
  },
});

function recipePostForm() {
  return (
    <form onSubmit={(e) => {
        e.preventDefault();
        uploadPost.mutate({
          authorId: session?.user?.id as string,
          title,
        });
        setTitle("");
        setOpen(false);
      }}
      >

        {selectedFile ? (
          <img src={selectedFile} className="w-full object-contain cursor-pointer" onClick={() => setSelectedFile("")} alt="" />
        ) : (
          <div onClick={() => filePickerRef.current?.click()} className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-orange-100 cursor-pointer">
            <BiCamera className="h-6 w-6 text-orange-500" aria-hidden="true" />
          </div>
        )}

        <div>
          <div className="mt-3 text-center sm:mt-5">
            <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-black">
              Upload a photo
            </Dialog.Title>

            <div>
              <input ref={filePickerRef} type="file" hidden onChange={addImageToPost} />
            </div>
            
            <div className="mt-2">
              <input className="border-none focus:ring-0 w-full text-center bg-gray-100 rounded-lg" type="text" placeholder="Please enter a title..." minLength={2} maxLength={100} value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>

              <div className="mt-2">
                <h4 className="text-lg font-medium mb-2">Ingredients</h4>
                {ingredients.map((ingredient, index) => (
                  <div key={index} className="flex">
                    <input
                      className="border-none bg-gray-100 rounded-lg mr-2 focus:ring-0 w-full"
                      type="text"
                      value={ingredient}
                      placeholder={`Ingredient ${index + 1}`}
                      onChange={(event) => {
                        const newIngredients = [...ingredients];
                        newIngredients[index] = event.target.value;
                        setIngredients(newIngredients);
                      }}
                    />
                    {index === ingredients.length - 1 && (
                      <div onClick={addIngredient} className="m-auto flex items-center justify-center h-8 w-8 rounded-full bg-orange-100 cursor-pointer">
                        <BiPlus className="h-6 w-6 text-center text-orange-500" aria-hidden="true" />
                      </div>
                    )}
                  </div>
                ))}
              </div>


              <div className="mt-4">
                <h4 className="text-lg font-medium mb-2">Steps</h4>
                {steps.map((step, index) => (
                  <div key={index} className="flex">
                    <input
                      className="border-none focus:ring-0 bg-gray-100 rounded-lg mr-2 w-full"
                      type="text"
                      value={step}
                      placeholder={`Step ${index + 1}`}
                      onChange={(event) => {
                        const newSteps = [...steps];
                        newSteps[index] = event.target.value;
                        setSteps(newSteps);
                      }}
                    />
                    {index === steps.length - 1 && (
                      <div onClick={addStep} className="m-auto flex items-center justify-center h-8 w-8 rounded-full bg-orange-100 cursor-pointer">
                        <BiPlus className="h-6 w-6 text-center text-orange-500" aria-hidden="true" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

          </div>

          <div className="mt-5 sm:mt:-6">
            <button type="submit" className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-orange-500 text-base font-medium text-black hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400 sm:text-sm disabled:bg-gray-300 disabled:cursor-not-allowed hover:disabled:bg-gray-300">
              Upload Post
            </button>
          </div>

        </div>
      </form>
)}

export default recipePostForm