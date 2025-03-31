import NavSection from './NavSection';
import GroupMembers from './GroupMembers';
import WorkLog from './WorkLog';

export default function HomePage({ groupMembers }) {
    return (
        <>
            <header>
                <NavSection groupMembers={groupMembers} />
            </header>
            <main>
                <GroupMembers groupMembers={groupMembers} />
                <WorkLog />
            </main>
        </>
    );
}