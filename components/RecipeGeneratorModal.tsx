import React, { Fragment, useRef, useState } from 'react'
import _app from "../src/pages";
import { useRecoilState } from "recoil";
import { recipeGeneratorModalAtom } from '../atoms/recipeGeneratorModalAtom';
import { Dialog, Transition } from '@headlessui/react';
import { useSession } from "next-auth/react";


function RecipeGeneratorModal() {

    return (
        <RecipeGenerator />
    )
}

export default RecipeGeneratorModal

const RecipeGenerator: React.FC = () => {
    const [open, setOpen] = useRecoilState(recipeGeneratorModalAtom);
    const { data: session, status } = useSession();
    const [recipe, setRecipe] = useState("");

    const [food, setFood] = useState("");
    const [ingrieidents, setIngrieidents] = useState("");
    const [meal, setMeal] = useState("");
    const [numPeople, setNumPeople] = useState("");

    const [isGenerating, setIsGenerating] = useState(false);
    const [isCopied, setIsCopied] = useState(false);

    /* eslint-disable */
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsGenerating(true);
        const res = await fetch("/api/returnRecipe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            food,
            ingrieidents,
            meal,
            numPeople,
          }),
        });
        setIsGenerating(false);
        const data = await res.json();
        console.log(data); 
        if (data.recipe) {
          setRecipe(data.recipe.trim());
        }
      };

    const handleCopy = () => {
        navigator.clipboard.writeText(recipe);
        setIsCopied(false);
        setOpen(false);
    };

    return status === "authenticated" ? (

        <Transition.Root show={open} as={Fragment}>
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
                            <div className="grid gap-y-12">
                                <div className="">
                                    <form onSubmit={(e) => handleSubmit(e)}>
                                        <div className="flex flex-col">
                                            <label className="sr-only" htmlFor="food">
                                            </label>
                                            <input
                                                type="text"
                                                className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
                                                name="food"
                                                placeholder="What do you want to eat?"
                                                id="food"
                                                value={food}
                                                onChange={(e) => setFood(e.target.value)}
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="keywords" className="sr-only">
                                                List ingreidents you'd like to use (Optional)
                                            </label>
                                            <textarea
                                                rows={7}
                                                value={ingrieidents}
                                                onChange={(e) => setIngrieidents(e.target.value)}
                                                name="keyWords"
                                                id="keyWords"
                                                placeholder="List ingreidents you'd like to use (Optional)"
                                                className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label className="sr-only" htmlFor="meal">
                                                Meal
                                            </label>
                                            <select
                                                value={meal}
                                                onChange={(e) => setMeal(e.target.value)}
                                                className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
                                                name="tone"
                                                id="tone"
                                            >
                                                <option value="default">Select type of meal (Optional)</option>
                                                <option value="breakfast">Breakfast</option>
                                                <option value="brunch">Brunch</option>
                                                <option value="lunch">Lunch</option>
                                                <option value="dinner">Dinner</option>
                                                <option value="supper">Supper</option>
                                                <option value="drool-worthy meal">Munchies Special</option>
                                            </select>
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="words" className="sr-only">
                                                Number of people eating (Optional)
                                            </label>
                                            <input
                                                value={numPeople}
                                                onChange={(e) => setNumPeople(e.target.value)}
                                                type="number"
                                                className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
                                                placeholder="Number Of People - Default 4 (Optional)"
                                                name="numPeople"
                                                id="numPeople"
                                            />
                                        </div>

                                        <button
                                            className={`bg-orange-500 w-full hover:bg-orange-600 text-black font-bold mt-2 py-2 mb-6 px-4 rounded ${isGenerating || food === ""
                                                ? "cursor-not-allowed opacity-50"
                                                : ""
                                                }`}
                                            type="submit"
                                            disabled={isGenerating || food === ""}
                                        >
                                            {isGenerating ? "Generating..." : "Generate recipe"}
                                        </button>
                                    </form>
                                    <div className="flex flex-col">
                                        <label htmlFor="output" className="sr-only">
                                            Output
                                        </label>
                                        <textarea
                                            rows={
                                                recipe === ""
                                                    ? 7
                                                    : recipe.split("\\n").length + 12
                                            }
                                            name="output"
                                            onChange={(e) => setRecipe(e.target.value)}
                                            value={recipe}
                                            disabled={recipe === ""}
                                            id="output"
                                            placeholder="AI generated recipe"
                                            className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
                                        />
                                        <button
                                            onClick={handleCopy}
                                            className="bg-orange-500 hover:bg-orange-600 text-black font-bold py-2 px-4 rounded"
                                            type="submit"

                                        >
                                            {isCopied ? "Copied" : "Copy to Clipboard"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Transition.Child>

                </div>
            </Dialog >

        </Transition.Root >
    ) : null;
/* eslint-enable */

};
