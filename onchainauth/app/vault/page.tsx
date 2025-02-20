"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { EllipsisVertical, Eye, EyeOff, Trash2, Edit } from "lucide-react";
import { AddPassword } from "@/components/ui/addPassword";
import { useVaultStore } from "@/store/vault";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UpdateVaultModal } from "@/components/ui/updatePassword";
import Background from "@/components/background";

type Vault = {
  id: number;
  name: string;
  owner: string;
  password: string;
};

export default function Vault() {
  const { vaults, addVault, removeVault, updateVault } = useVaultStore();
  const [selectedVault, setSelectedVault] = useState<Vault | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [showCard, setShowCard] = useState(false);
  const [showPasswords, setShowPasswords] = useState<{
    [key: number]: boolean;
  }>({});

  const addNewVault = () => {
    setShowCard(!showCard);
  };

  const togglePasswordVisibility = (id: number) => {
    setShowPasswords((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleDeleteVault = (vaultId: number) => {
    removeVault(vaultId);
  };

  const handleUpdateVault = (vault: Vault) => {
    setSelectedVault(vault);
    setIsUpdateModalOpen(true);
    console.log(`Updating vault ${vault.id}`);
  };

  const handleVaultUpdate = (updatedVault: Vault) => {
    updateVault(updatedVault);
  };

  const indexOfLastVault = currentPage * itemsPerPage;
  const indexOfFirstVault = indexOfLastVault - itemsPerPage;
  const currentVaults = vaults.slice(indexOfFirstVault, indexOfLastVault);
  const totalPages = Math.ceil(vaults.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Background />
      <section className={`container mx-auto max-w-6xl py-8 relative  `}>
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-semibold text-2xl">All vaults</h1>
          <Button
            className="bg-blue-600 hover:bg-blue-500 text-white"
            onClick={addNewVault}
          >
            + New
          </Button>
        </div>
        {showCard && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 duration-500">
            <div className="p-6 rounded-lg shadow-lg w-96 relative">
              <button
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                onClick={addNewVault}
              >
                X
              </button>
              <AddPassword
                programId="2Ho6vDNZXrbSQxxwRbbRzYEgfgbkfkGMnVGes1PtefNz"
                onSuccess={addVault}
                onClose={() => setShowCard(false)}
              />
            </div>
          </div>
        )}
        <main className="space-y-4">
          <div className="grid grid-cols-[auto,2fr,2fr,2fr,auto] items-center gap-6 p-4 rounded-lg border bg-gray-600">
            <div className="flex items-center">
              <Checkbox />
            </div>
            <div className="font-medium">Names</div>
            <div className="font-medium">Owner</div>
            <div className="font-medium">Password</div>
            <div className="flex justify-end">
              <EllipsisVertical className="cursor-pointer" />
            </div>
          </div>
          {selectedVault && (
            <UpdateVaultModal
              vault={selectedVault}
              isOpen={isUpdateModalOpen}
              setIsUpdateModalOpen={setIsUpdateModalOpen}
              onUpdate={handleVaultUpdate}
            />
          )}

          {currentVaults.map((vault: Vault) => (
            <div
              key={vault.id}
              className="grid grid-cols-[auto,2fr,2fr,2fr,auto] items-center gap-6 p-4 rounded-lg border hover:scale-110  hover:cursor-pointer delay-150 duration-300 ease-in-out    hover:-translate-y-1 hover:bg-slate-700 overflow-y-auto"
            >
              <div className="flex items-center">
                <Checkbox />
              </div>
              <div className="text-sm truncate">{vault.name}</div>
              <div className="text-sm text-white truncate">{vault.owner}</div>
              <div className="text-sm text-white truncate">
                {showPasswords[vault.id] ? vault.password : "••••••••"}
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => togglePasswordVisibility(vault.id)}
                >
                  {showPasswords[vault.id] ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <EllipsisVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onSelect={() => handleUpdateVault(vault)}
                    >
                      <Edit className="mr-2 h-4 w-4" /> Update
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer text-red-500 focus:bg-red-100 focus:text-red-900"
                      onSelect={() => handleDeleteVault(vault.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}

          {vaults.length > 0 && (
            <div className="flex justify-center gap-2 mt-4">
              <Button
                variant="outline"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-2 border-gray-600 bg-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white disabled:opacity-50 disabled:hover:bg-transparent"
              >
                Previous
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-2 ${
                      currentPage === page
                        ? "bg-gray-600 hover:bg-slate-500 text-white"
                        : "border-gray-600 bg-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`}
                  >
                    {page}
                  </Button>
                )
              )}
              <Button
                variant="outline"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-2 border-gray-600 text-gray-300 bg-gray-600 hover:bg-gray-700 hover:text-white disabled:opacity-50 disabled:hover:bg-transparent"
              >
                Next
              </Button>
            </div>
          )}

          {vaults.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No passwords stored yet. Click New Password to add one.
            </div>
          )}
        </main>
      </section>
    </>
  );
}
