import { urlFor } from "@/lib/sanity";

interface AuthorCardProps {
  author: {
    name: string;
    avatar?: any;
    role?: string;
    bio?: string;
    social?: {
      twitter?: string;
      linkedin?: string;
    };
  };
}

export default function AuthorCard({ author }: AuthorCardProps) {
  return (
    <div className="flex gap-4 rounded-xl border border-border bg-card p-6">
      {author.avatar && (
        <img
          src={urlFor(author.avatar).width(80).height(80).url()}
          alt={author.name}
          className="h-16 w-16 flex-shrink-0 rounded-full object-cover"
        />
      )}
      <div>
        <h4 className="font-semibold text-foreground">{author.name}</h4>
        {author.role && (
          <p className="font-mono text-xs text-muted-text">{author.role}</p>
        )}
        {author.bio && (
          <p className="mt-2 text-sm leading-relaxed text-secondary-text">{author.bio}</p>
        )}
        {author.social && (
          <div className="mt-3 flex gap-3">
            {author.social.twitter && (
              <a
                href={author.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-secondary-text transition-colors hover:text-foreground"
              >
                Twitter/X
              </a>
            )}
            {author.social.linkedin && (
              <a
                href={author.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-secondary-text transition-colors hover:text-foreground"
              >
                LinkedIn
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
