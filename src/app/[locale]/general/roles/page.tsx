"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const RoleManagementPage = () => {
  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-ghibi-bold">Role Management</h1>
        <Dialog>
          <DialogTrigger asChild>
            <button className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold py-2 px-4 rounded-lg shadow-primary">
              Add Role
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Role</DialogTitle>
              <DialogDescription>
                Add a new role and set its permissions.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="name" className="text-right">
                  Role Name
                </label>
                <input id="name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="permissions" className="text-right">
                  Permissions
                </label>
                <textarea id="permissions" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <button className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold py-2 px-4 rounded-lg shadow-primary">
                Add
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="bg-card text-card-foreground shadow-md rounded-lg my-6 border">
        <table className="min-w-max w-full table-auto">
          <thead>
            <tr className="bg-muted text-muted-foreground uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Role</th>
              <th className="py-3 px-6 text-left">Permissions</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-card-foreground text-sm font-light">
            <tr className="border-b border-border hover:bg-muted/50">
              <td className="py-3 px-6 text-left whitespace-nowrap">
                <div className="flex items-center">
                  <span className="font-medium">Admin</span>
                </div>
              </td>
              <td className="py-3 px-6 text-left">
                <div className="flex items-center">
                  <span>All</span>
                </div>
              </td>
              <td className="py-3 px-6 text-center">
                <div className="flex item-center justify-center">
                  <div className="w-4 mr-2 transform hover:text-primary hover:scale-110">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L16.732 3.732z"
                      />
                    </svg>
                  </div>
                  <div className="w-4 mr-2 transform hover:text-destructive hover:scale-110">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RoleManagementPage;
