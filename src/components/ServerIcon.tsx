interface Props {
  image: string;
}

const ServerIcon = ({ image }: Props) => {
  return (
    <img
      src={image}
      alt="server icon"
      className="h-12 w-12 cursor-pointer rounded-full transition-all duration-100 ease-out hover:rounded-2xl"
    />
  );
};

export default ServerIcon;
