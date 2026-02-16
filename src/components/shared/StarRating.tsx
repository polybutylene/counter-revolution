import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function StarRating({ rating, maxStars = 5, size = "md", className }: StarRatingProps) {
  const sizeMap = { sm: "h-3.5 w-3.5", md: "h-5 w-5", lg: "h-6 w-6" };
  const iconSize = sizeMap[size];

  return (
    <div className={cn("flex items-center gap-0.5", className)} aria-label={`${rating} out of ${maxStars} stars`}>
      {Array.from({ length: maxStars }, (_, i) => {
        const filled = i < Math.floor(rating);
        const halfFilled = !filled && i < rating;

        return (
          <Star
            key={i}
            className={cn(
              iconSize,
              filled
                ? "fill-gold text-gold"
                : halfFilled
                  ? "fill-gold/50 text-gold"
                  : "fill-gray-200 text-gray-200"
            )}
          />
        );
      })}
    </div>
  );
}
