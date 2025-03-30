import Nav from './Nav';
import GroupMembers from './GroupMembers';
import Arbeidslogg from './Arbeidslogg';

export default function Layout () {

    return(
        <>
            <header>
                <Nav />
            </header>
            <main>
                <GroupMembers />
                <Arbeidslogg />
            </main>
        </>
    )
}