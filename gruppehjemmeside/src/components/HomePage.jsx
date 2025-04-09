import NavSection from './NavSection';
import GroupMembers from './GroupMembers';
import WorkLog from './WorkLog';
import { useEffect, useState } from 'react';
import { fetchAllGroupMembers } from '../sanity/memberServices';

export default function HomePage() {
    const [groupMembers, setGroupMembers] = useState([]);

    useEffect(() => {
        async function getGroupMembers() {
            const data = await fetchAllGroupMembers();
            setGroupMembers(data);
        }
        
    getGroupMembers();
    }
    , []);

    return (
        <>
            <main>
                <GroupMembers groupMembers={groupMembers} />
                <WorkLog />
            </main>
        </>
    );
}