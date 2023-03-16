import { NextApiRequest, NextApiResponse } from "next";
import fetch from 'node-fetch';

type RecipeParams = {
  food?: string;
  ingrieidents?: string;
  meal?: string;
  numPeople?: number;
};

type RecipeResponse = {
  recipe: string;
};

interface OpenAIResponse {
  choices: { text: string }[];
}

const generateRecipe = async ({
  food,
  ingrieidents,
  meal,
  numPeople,
}: RecipeParams): Promise<string> => {
  try {
    const response = await fetch(
      "https://api.openai.com/v1/engines/text-davinci-003/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          prompt: `Write a recipe for ${
            food ?? "a random meal"
          }${ingrieidents ? `, with the following ingredients: ${ingrieidents}` : ""
          } that is to feed ${numPeople ?? 4} people.${
            meal ? `Make it a ${meal}.` : ""
          } The recipe should list the ingredients with the quantities in metric system and then list the steps. The recipe should not contain any bad language and should also include some rough nutritional information like macros and calories at the end.`,
          max_tokens: 100,
          temperature: 0.5,
        }),
      }
    );
    console.log(response.status);
    const data = await response.json() as OpenAIResponse;

    const recipe = data.choices?.[0]?.text ?? "";

    return recipe;
  } catch (err) {
    console.error(err);
    return "";
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RecipeResponse>
): Promise<void> {
  const { food, ingrieidents, meal, numPeople } = req.body as RecipeParams;

  const recipe = await generateRecipe({
    food,
    ingrieidents,
    meal,
    numPeople,
  });

  res.status(200).json({
    recipe,
  });
}