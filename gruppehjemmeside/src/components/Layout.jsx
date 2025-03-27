import Nav from './Nav';
import GroupMembers from './GroupMembers';

export default function Layout () {

    return(
        <>
            <header>
                <Nav />
            </header>
            <main>
                <GroupMembers />
            </main>
        </>
    )
}