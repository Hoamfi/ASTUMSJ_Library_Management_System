interface Props {
  width: string;
  height: string;
}

const BookCardSkeleton = ({ width, height }: Props) => {
  return (
    <div>
      <div
        className={`w-[${width}] h-[${height}] overflow-hidden rounded-xl bg-gray-900 dark:bg-[#1d293d] animate-pulse`}
      ></div>
      <div className="bg-gray-900 dark:bg-[#1d293d] animate-pulse w-25 h-3 my-3 rounded-full"></div>
    </div>
  );
};

export default BookCardSkeleton;
