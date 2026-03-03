"use client"
import React, { useState } from 'react'
import Wrapper from '../components/Wrapper'
import { SquarePlus } from 'lucide-react'
import { toast } from 'react-toastify'
import { addUserToProject } from '../actions'
import { useUser } from '@clerk/nextjs'

const page = () => {
    const {user} = useUser()
    const email = user?.primaryEmailAddress?.emailAddress as string
    const [inviteCode, setInviteCode] = useState("")

    const handleSubmit = async () => {
        try {
            if(inviteCode !=""){
                await addUserToProject(email, inviteCode)
                toast.success('Vous pouvez maintenant collaboré sur ce projet')
            } else {
                toast.error('Il manque le code du projet')
            }
        } catch (error) {
            toast.error('Code invalide ou vous appartenez déjà au projet')
        }
    }

    return (
        <Wrapper>
            <div className='flex'>
                <div className='mb-4'>
                    <input
                        value={inviteCode}
                        onChange={(e) => setInviteCode(e.target.value)}
                        type="text"
                        placeholder="Code d'invitation"
                        className='w-full p-2 input input-bordered'
                    />
                </div>
                <button className='btn btn-primary ml-4' onClick={handleSubmit}>
                    Rejoindre <SquarePlus className='w-4'/>
                </button>
            </div>
        </Wrapper>
    )
}

export default page
