'use client';

import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Review as ReviewType } from '@/lib/types';
import ms from 'ms';
import { FiveStarRating } from './FiveStarRating';

export function Review({ review }: { review: ReviewType }) {
  const [relativeTime, setRelativeTime] = useState('');

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setRelativeTime(timeAgo(new Date(review.date)));
    });

    return () => window.clearTimeout(timeoutId);
  }, [review.date]);

  return (
    <div className='flex gap-4'>
      <Avatar>
        <AvatarFallback>{getInitials(review.reviewer)}</AvatarFallback>
      </Avatar>

      <div className='flex-1 space-y-2'>
        <div className='flex items-center justify-between'>
          <div>
            <p className='font-medium text-sm'>{review.reviewer}</p>
            <div className='flex items-center gap-2 mt-1'>
              <FiveStarRating rating={review.stars} />
              <time
                className='text-xs text-muted-foreground'
                dateTime={review.date}
              >
                {relativeTime}
              </time>
            </div>
          </div>
        </div>

        <p className='text-sm leading-relaxed text-muted-foreground'>
          {review.review}
        </p>
      </div>
    </div>
  );
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function timeAgo(date: Date, suffix = true): string {
  const diff = Date.now() - date.getTime();

  if (diff < 1000) {
    return 'Just now';
  }

  return `${ms(diff, { long: true })}${suffix ? ' ago' : ''}`;
}
