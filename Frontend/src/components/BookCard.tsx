interface Book {
  title: string;
  bookCover: string;
}

const BookCard = ({ title, bookCover }: Book) => {
  return (
    <div className="relative" style={{ width: "130px" }}>
      <div className="overflow-hidden rounded-xl">
        <img
          src={bookCover}
          alt=""
          className="rounded-xl transition-transform duration-300 hover:scale-110"
        />
      </div>
      <div>
        <h1 className="text-sm font-sans">{title}</h1>
      </div>
    </div>
  );
};

export default BookCard;
