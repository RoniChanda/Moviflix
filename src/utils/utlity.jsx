import ISO6391 from "iso-639-1";

export const languageRearrange = () => {
  const rearrangeArr = ["ENGLISH", "HINDI", "BENGALI"];
  const arrWithCode = [];
  const filteredArr = ISO6391.getAllNames()
    .filter(
      (item) => item !== "English" && item !== "Hindi" && item !== "Bengali"
    )
    .sort();

  [...rearrangeArr, ...filteredArr].map((item) =>
    arrWithCode.push({ language: item, code: ISO6391.getCode(item) })
  );

  return arrWithCode;
};

const genres = [
  {
    id: 28,
    name: "Action",
  },
  {
    id: 12,
    name: "Adventure",
  },
  {
    id: 35,
    name: "Comedy",
  },

  {
    id: 14,
    name: "Fantasy",
  },
  {
    id: 36,
    name: "History",
  },
  {
    id: 27,
    name: "Horror",
  },
  {
    id: 10402,
    name: "Music",
  },
  {
    id: 10749,
    name: "Romance",
  },
  {
    id: 878,
    name: "Science Fiction",
  },
  {
    id: 10770,
    name: "TV Movie",
  },
  {
    id: 53,
    name: "Thriller",
  },
  {
    id: 10752,
    name: "War",
  },
  {
    id: 10759,
    name: "Action & Adventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentary",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 10762,
    name: "Kids",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10763,
    name: "News",
  },
  {
    id: 10764,
    name: "Reality",
  },
  {
    id: 10765,
    name: "Sci-Fi & Fantasy",
  },
  {
    id: 10766,
    name: "Soap",
  },
  {
    id: 10767,
    name: "Talk",
  },
  {
    id: 10768,
    name: "War & Politics",
  },
  {
    id: 37,
    name: "Western",
  },
];

export const cleanData = (arr) => {
  const cleanedArr = arr.filter(
    (item) =>
      !item.title.includes("Porn") &&
      !item.title.includes("porn") &&
      !item.title.includes("orgasm") &&
      !item.title.includes("Orgasm") &&
      !item.title.includes("Hentai") &&
      !item.title.includes("hentai")
  );
  return cleanedArr;
};

export const getGenreName = (arr) => {
  const genreNames = genres
    .map((item) => arr.includes(item.id) && item.name)
    .filter((item) => item !== false)
    .slice(0, 2);

  return genreNames;
};

export const sliceTitle = (title) => {
  return title.slice(0, 10);
};

export const getStartYears = (end) => {
  const years = [];
  for (let i = end; i >= 1900; i--) {
    years.push(i);
  }
  return years;
};

export const getEndYears = (start) => {
  const years = [];
  for (let i = new Date().getFullYear(); i >= start; i--) {
    years.push(i);
  }
  return years;
};

export const commaSeperator = (x) => {
  const parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
};

export const getFilterResult = (
  _,
  rating,
  language,
  sort,
  startYear,
  endYear,
  genre
) => {
  const sortArr = sort.split(".");

  return `${
    genre ? genres.filter((item) => item.id === genre)[0].name : "All genres"
  } | 
          ${rating ? rating + "+" : "All"} rating |
            ${language ? ISO6391.getName(language) : "All language"} |
            ${startYear + "-" + endYear} | ${
    sortArr[0].charAt(0).toUpperCase() + sortArr[0].slice(1) + " "
  }(${sortArr[1]})`;
};
