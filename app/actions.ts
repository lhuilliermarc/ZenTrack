"use server"

import { prisma } from "@/lib/prisma";

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