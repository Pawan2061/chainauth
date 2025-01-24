import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

type Vault = {
  id: number;
  name: string;
  owner: string;
  password: string;
};

type UpdateVaultModalProps = {
  vault: Vault;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (updatedVault: Vault) => void;
};

export const UpdateVaultModal: React.FC<UpdateVaultModalProps> = ({
  vault,
  isOpen,
  onClose,
  onUpdate,
}) => {
  const [updatedVault, setUpdatedVault] = useState<Vault>(vault);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedVault((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onUpdate(updatedVault);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-slate-700">
        <DialogHeader>
          <DialogTitle>Update Vault</DialogTitle>
          <DialogDescription>
            Make changes to your vault details here.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="name" className="text-right">
              Name
            </label>
            <Input
              id="name"
              name="name"
              value={updatedVault.name}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="owner" className="text-right">
              Owner
            </label>
            <Input
              id="owner"
              name="owner"
              value={updatedVault.owner}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="password" className="text-right">
              Password
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              value={updatedVault.password}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
