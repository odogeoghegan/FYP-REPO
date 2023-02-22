import React, { Fragment, useRef, useState } from 'react'
import { useRecoilState } from "recoil";
import { modalState } from '../atoms/modalAtom';
import { Dialog, Transition } from '@headlessui/react';
import {
  BiCamera
} from "react-icons/bi";

function CreateModal() {
  const [open, setOpen] = useRecoilState(modalState);
  const filePickerRef = useRef(null);
  const captionRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  //testing recipes form
  const [postType, setPostType] = useState('basic');
  const [ingredients, setIngredients] = useState([""]);
  const [steps, setSteps] = useState([""])

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    }
  }

  //testing recipes form
  const addIngredient = () => {
    setIngredients((prevIngredients) => [...prevIngredients, ""]);
  };
  //testing recipes form
  const addStep = () => {
    setSteps((prevSteps) => [...prevSteps, ""]);
  };

  const handleSubmit = () => {
    const caption = captionRef.current.value;
    if (postType === 'basic') {
      // handle basic post submission
    } else if (postType === 'recipe') {
      // handle recipe post submission
    }
  };

  return <Transition.Root show={open} as={Fragment}>
    <Dialog as='div' className='fixed z-10 inset-0 overflow-y-auto' onClose={setOpen}>
      <div className='flex items-end justify-center min-h-[600px] mt-16 mb-12 sm:mt-12 sm:mb-12 sm:min-h-screen pt-4 px-4 pb-2 text-center sm:block sm:p-0'>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        {/* Element tricks browser into centering modal contents. */}
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enterTo="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 translate-y-0 sm:scale-100"
          leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >

          <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
            <div className="flex flex-row justify-center mb-4">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-l" onClick={() => setPostType("basic")}>Basic Post</button>
              <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r" onClick={() => setPostType("recipe")}>Recipe Post</button>
            </div>

            {selectedFile ? (
              <img src={selectedFile} className="w-full object-contain cursor-pointer" onClick={() => setSelectedFile(null)} alt="" />
            ) : (
              <div onClick={() => filePickerRef.current.click()} className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 cursor-pointer">
                <BiCamera className="h-6 w-6 text-indigo-600" aria-hidden="true" />
              </div>
            )}

            <div>
              <div className="mt-3 text-center sm:mt-5">
                <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                  Upload a photo
                </Dialog.Title>

                <div>
                  <input ref={filePickerRef} type="file" hidden onChange={addImageToPost} />
                </div>
                <div className="mt-2">
                  <input className="border-none focus:ring-0 w-full text-center" type="text" /* ref={captionRef} */ placeholder="Please enter a caption..." />
                </div>

                {postType === "recipe" && (
                  <div className="mt-2">
                    <h4 className="text-lg font-medium mb-2">Ingredients</h4>
                    {ingredients.map((ingredient, index) => (
                      <div key={index} className="flex">
                        <input
                          className="border-none focus:ring-0 w-full"
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
                          <button
                            type="button"
                            className="ml-2 px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                            onClick={addIngredient}
                          >
                            Add
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {postType === "recipe" && (
                  <div className="mt-4">
                  <h4 className="text-lg font-medium mb-2">Steps</h4>
                  {steps.map((step, index) => (
                    <div key={index} className="flex">
                      <input
                        className="border-none focus:ring-0 w-full"
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
                        <button
                          type="button"
                          className="ml-2 px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                          onClick={addStep}
                        >
                          Add
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                )}

              </div>

              <div className="mt-5 sm:mt:-6">
                <button type="button" className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm disabled:bg-gray-300 disabled:cursor-not-allowed hover:disabled:bg-gray-300">
                  Upload Post
                </button>
              </div>

            </div>
          </div>
        </Transition.Child>

      </div>
    </Dialog>

  </Transition.Root>
}

export default CreateModal