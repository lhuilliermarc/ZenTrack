"use server"

import { prisma } from "@/lib/prisma";
import { randomBytes } from "crypto";

export async function checkAndAddUser(email:string, name:string) {
    if(!email) return
    try{
        const existingUser = await prisma.user.findUnique({
            where : {
                email : email
            }
        })
        if(!existingUser && name){
            await prisma.user.create({
                data: {
                    email,
                    name
                }
            })
            console.log("utilisateur créer");
        } else {
            console.log("utilisateur déjà présent dans la base de données");
        }
    } catch (error) {
        console.log("erreur lors de la vérification de l'utilisateur", error);
    }
}

function generateUniqueCode():string{
    return randomBytes(6).toString('hex')
}

export async function createProject(name:string, description: string, email:string) {
    try {
        const inviteCode = generateUniqueCode()
        const user = await prisma.user.findUnique({
            where : {
                email
            }
        })
        if(!user){
            throw new Error('User not found');
        }
        const newProject = await prisma.project.create({
            data: {
                name,
                description,
                inviteCode,
                createdById : user.id
            }
        })
        return newProject;
    } catch (error) {
        console.error(error)
        throw new Error
    }
}