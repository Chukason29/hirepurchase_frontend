type Props = {
    videoId: string;
  };
  
  export default function YouTubeEmbed({ videoId }: Props) {
    return (
      <div className="w-full max-w-3xl mx-auto aspect-video">
        <iframe
          className="w-full h-full rounded-xl"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    );
  }
  