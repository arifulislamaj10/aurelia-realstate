import { featuredVideo, houseTourVideos } from "@/data/agency";

export function VideoSection() {
  const moreVideos = houseTourVideos.filter((v) => v.youtubeId !== featuredVideo.youtubeId).slice(0, 3);

  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
          <div>
            <p className="label-luxury text-accent">Featured Video</p>
            <h2 className="headline-editorial mt-2 text-3xl text-primary sm:text-4xl">
              {featuredVideo.title}
            </h2>
            <p className="mt-1 text-sm font-medium text-accent">{featuredVideo.label}</p>
            <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
              {featuredVideo.description}
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-border shadow-md">
            <iframe
              title={featuredVideo.title}
              src={`https://www.youtube.com/embed/${featuredVideo.youtubeId}?rel=0`}
              className="aspect-video w-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        <div className="mt-10 sm:mt-12">
          <p className="label-luxury text-muted">More House Tours</p>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
            {moreVideos.map((video) => (
              <div key={video.youtubeId} className="overflow-hidden rounded-2xl border border-border">
                <iframe
                  title={video.title}
                  src={`https://www.youtube.com/embed/${video.youtubeId}?rel=0`}
                  className="aspect-video w-full border-0"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                <div className="border-t border-border bg-white/70 p-3 sm:p-4">
                  <p className="text-sm font-medium text-primary">{video.title}</p>
                  <p className="mt-0.5 text-xs text-muted">{video.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
