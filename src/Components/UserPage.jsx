import { useContext } from 'react'
import UserCard from './Cards/UserCard'
import { NoteContext } from '../ContextApi/useContext.jsx'

const UserPage = () => {

    const { user } = useContext(NoteContext)

    return (
        <div className="sm:flex block justify-center items-center h-screen">
            <UserCard user={user} />
        </div>

    )
}

export default UserPage
