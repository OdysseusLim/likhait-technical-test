import { useState, useEffect } from "react";
import { fetchCategories, createCategory } from "../services/api";

export const ADD_NEW_CATEGORY_VALUE = "__add_new__";

interface Category {
  id: number;
  name: string;
}

interface UseCategoriesOptions {
  onCategorySelected: (categoryName: string) => void;
}

export function useCategories({ onCategorySelected }: UseCategoriesOptions) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .catch((err) => console.error("Failed to load categories:", err));
  }, []);

  const categoryOptions = [
    ...categories.map((category) => ({
      value: category.name,
      label: category.name,
    })),
    { value: ADD_NEW_CATEGORY_VALUE, label: "+ Add New Category" },
  ];

  const handleCategoryChange = (value: string) => {
    if (value === ADD_NEW_CATEGORY_VALUE) {
      setCreateError(null);
      setIsAddCategoryOpen(true);
      return;
    }
    onCategorySelected(value);
  };

  const submitNewCategory = async (name: string) => {
    setIsCreating(true);
    setCreateError(null);
    try {
      const category = await createCategory(name);
      setCategories((prev) => [...prev, category]);
      onCategorySelected(category.name);
      setIsAddCategoryOpen(false);
    } catch (err) {
      setCreateError(err instanceof Error ? err.message : "Failed to create category");
    } finally {
      setIsCreating(false);
    }
  };

  return {
    categoryOptions,
    isAddCategoryOpen,
    closeAddCategory: () => setIsAddCategoryOpen(false),
    handleCategoryChange,
    submitNewCategory,
    isCreating,
    createError,
  };
}