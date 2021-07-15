import { useRouter } from "next/router";

const SessionCard = ({ session }) => {
  const router = useRouter();
  const redirect = () => {
    router.push(`/t/${session.tool.name}/${session.id}`);
  };
  return (
    <>
      <div onClick={redirect}>
        <div>
          {session.tool.name}: {session.title}
        </div>
      </div>
    </>
  );
};

export default SessionCard;
