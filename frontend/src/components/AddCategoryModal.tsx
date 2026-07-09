/**
 * Modal for creating a new expense category
 */

import React, { useState } from "react";
import { Modal } from "../vibes";
import { TextField } from "../vibes";
import { Button } from "../vibes";

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string) => void;
  isSubmitting: boolean;
  error: string | null;
}

export function AddCategoryModal({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting,
  error,
}: AddCategoryModalProps) {
  const [name, setName] = useState("");

  const handleSubmit = () => {
    if (!name.trim()) return;
    onSubmit(name.trim());
  };

  const handleClose = () => {
    setName("");
    onClose();
  };

  const buttonGroupStyle: React.CSSProperties = {
    display: "flex",
    gap: "0.5rem",
    marginTop: "1rem",
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Add Category">
      <TextField
        label="Category Name"
        type="text"
        placeholder="e.g. Subscriptions"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={error ?? undefined}
        fullWidth
        required
      />
      <div style={buttonGroupStyle}>
        <Button
          type="button"
          variant="primary"
          onClick={handleSubmit}
          disabled={isSubmitting || !name.trim()}
          fullWidth
        >
          {isSubmitting ? "Saving..." : "Save Category"}
        </Button>
        <Button type="button" variant="secondary" onClick={handleClose} disabled={isSubmitting}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
}