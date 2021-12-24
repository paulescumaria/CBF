import axios from "axios";

export const getRecipe = async () => {
      return await axios.get("/api/viewrecipes")
}

export const newRecipe = async (data) => {
    return await axios.post("/api/newrecipe", data)
}

export const modifyRecipe = async (data) => {
    return await axios.put("/api/modifyrecipe", data)
}

export const deleteRecipe = async (data) => {
    return await axios.delete("/api/removerecipe", data)
}