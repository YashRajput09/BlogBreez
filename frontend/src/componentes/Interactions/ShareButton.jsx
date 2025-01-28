// components/Interactions/ShareButton.jsx
import React, { useState } from 'react';
import { Share2, Link as LinkIcon, Mail, Twitter, Facebook, Instagram } from 'lucide-react';
import toast from 'react-hot-toast';

const ShareButton = ({ url, title }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success('Link copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy link');
    }
  };

  const handleNativeShare = async () => {
    try {
      await navigator.share({
        title: title,
        text: `Check out this blog: ${title}`,
        url: url,
      });
    } catch (err) {
      console.log('Native sharing not supported');
    }
  };

  const handleEmailShare = () => {
    window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`;
  };

  const handleSocialShare = (platform) => {
    const encodedUrl = encodeURIComponent(url);
    const text = encodeURIComponent(`Check out this blog: ${title}`);

    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${encodedUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      instagram: `https://www.instagram.com/?url=${encodedUrl}`, // Instagram doesn't support direct sharing,
      snapchat: `https://www.snapchat.com/scan?attachmentUrl=${encodedUrl}`, 
    };

    window.open(urls[platform], '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="relative">
      {/* Share Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-gray-500 hover:text-indigo-600 transition-colors"
      >
        <Share2 size={18} className="mr-1" />
        
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute bg-white shadow-lg rounded-lg p-3 w-56 z-10 mt-2">
          <div className="space-y-2">
            {navigator.share && (
              <button
                onClick={handleNativeShare}
                className="flex items-center w-full p-2 hover:bg-gray-100 rounded"
              >
                <Share2 size={16} className="mr-2" />
                Native Share
              </button>
            )}
            <button
              onClick={handleCopyLink}
              className="flex items-center w-full p-2 hover:bg-gray-100 rounded"
            >
              <LinkIcon size={16} className="mr-2" />
              Copy Link
            </button>
            <button
              onClick={handleEmailShare}
              className="flex items-center w-full p-2 hover:bg-gray-100 rounded"
            >
              <Mail size={16} className="mr-2" />
              Email
            </button>
            <button
              onClick={() => handleSocialShare('twitter')}
              className="flex items-center w-full p-2 hover:bg-gray-100 rounded"
            >
              <Twitter size={16} className="mr-2" />
              Twitter
            </button>
            <button
              onClick={() => handleSocialShare('facebook')}
              className="flex items-center w-full p-2 hover:bg-gray-100 rounded"
            >
              <Facebook size={16} className="mr-2" />
              Facebook
            </button>
            <button
              onClick={() => handleSocialShare('instagram')}
              className="flex items-center w-full p-2 hover:bg-gray-100 rounded"
            >
              <Instagram size={16} className="mr-2" />
              Instagram
            </button>
            <button
              onClick={() => handleSocialShare('snapchat')}
              className="flex items-center w-full p-2 hover:bg-gray-100 rounded"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="mr-2"
              >
                <path d="M18.89 12.71c-.36.53-.83.96-1.39 1.28-.56.32-1.18.49-1.82.49-.64 0-1.26-.17-1.82-.49-.56-.32-1.03-.75-1.39-1.28-.36-.53-.54-1.14-.54-1.78s.18-1.25.54-1.78c.36-.53.83-.96 1.39-1.28.56-.32 1.18-.49 1.82-.49.64 0 1.26.17 1.82.49.56.32 1.03.75 1.39 1.28.36.53.54 1.14.54 1.78s-.18 1.25-.54 1.78zM12 2.02c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
              </svg>
              Snapchat
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareButton;