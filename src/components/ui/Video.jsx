import "./Video.css";

export default function Video({ trailerKey }) {
  return (
    <div className="video">
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube-nocookie.com/embed/${trailerKey}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen="allowfullscreen"
      ></iframe>
    </div>
  );
}
