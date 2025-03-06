export default function Login() {
  return (
    <section>
      <h1>Logg inn</h1>
      <form>
        <label>
          Brukernavn
          <input type="text" placeholder="Ackarlse..." />
        </label>
        <label>
          Passord
          <input type="password" placeholder="*********" />
        </label>
        <button>Logg inn</button>
      </form>
    </section>
  );
}
