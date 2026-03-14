'use client';

import { useState, useEffect, useCallback } from 'react';

interface LikesData {
  [promptId: string]: number;
}

interface UserLikesData {
  [promptId: string]: boolean;
}

const STORAGE_KEY = 'synthia-likes';
const USER_LIKES_KEY = 'synthia-user-likes';

function getLikesFromStorage(): LikesData {
  if (typeof window === 'undefined') return {};
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

function getUserLikesFromStorage(): UserLikesData {
  if (typeof window === 'undefined') return {};
  try {
    const data = localStorage.getItem(USER_LIKES_KEY);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

function saveLikesToStorage(likes: LikesData) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(likes));
}

function saveUserLikesToStorage(userLikes: UserLikesData) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(USER_LIKES_KEY, JSON.stringify(userLikes));
}

export function useLikes() {
  const [likes, setLikes] = useState<LikesData>({});
  const [userLikes, setUserLikes] = useState<UserLikesData>({});

  useEffect(() => {
    setLikes(getLikesFromStorage());
    setUserLikes(getUserLikesFromStorage());
  }, []);

  const toggleLike = useCallback((promptId: string) => {
    const isCurrentlyLiked = getUserLikesFromStorage()[promptId] || false;

    const newUserLikes = { ...getUserLikesFromStorage(), [promptId]: !isCurrentlyLiked };
    saveUserLikesToStorage(newUserLikes);
    setUserLikes(newUserLikes);

    const currentLikes = getLikesFromStorage();
    const currentCount = currentLikes[promptId] || 0;
    const newLikes = {
      ...currentLikes,
      [promptId]: isCurrentlyLiked ? Math.max(0, currentCount - 1) : currentCount + 1,
    };
    saveLikesToStorage(newLikes);
    setLikes(newLikes);
  }, []);

  const getLikeCount = useCallback((promptId: string) => {
    return likes[promptId] || 0;
  }, [likes]);

  const isLiked = useCallback((promptId: string) => {
    return userLikes[promptId] || false;
  }, [userLikes]);

  return { toggleLike, getLikeCount, isLiked, likes };
}
