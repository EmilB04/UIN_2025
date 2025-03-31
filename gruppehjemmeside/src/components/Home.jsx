import Nav from './Nav';
import GroupMembers from './GroupMembers';
import WorkLog from './WorkLog';

export default function Layout () {

    return(
        <>
            <header>
                <Nav />
            </header>
            <main>
                <GroupMembers />
                <WorkLog />
            </main>
        </>
    )
}