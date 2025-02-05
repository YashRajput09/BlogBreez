import { useState, useEffect, useRef } from "react";
import { SlidersHorizontal, Volume2, Pause, StopCircle, Download } from "lucide-react";

const VoiceReader = () => {
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(
    localStorage.getItem("selectedVoice") || ""
  );
  const [speed, setSpeed] = useState(
    parseFloat(localStorage.getItem("speed")) || 1
  );
  const [pitch, setPitch] = useState(
    parseFloat(localStorage.getItem("pitch")) || 1
  );
  const [volume, setVolume] = useState(
    parseFloat(localStorage.getItem("volume")) || 1
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [status, setStatus] = useState("Voice reader ready");
  const [showSettings, setShowSettings] = useState(false);
  const [voiceOpetions, setVoiceOpetions] = useState(false);

  const synthRef = useRef(null);
  const utteranceRef = useRef(null);

  useEffect(() => {
    synthRef.current = window.speechSynthesis;
    loadVoices();

    const handleVoicesChanged = () => loadVoices();
    synthRef.current.addEventListener("voiceschanged", handleVoicesChanged);

    return () => {
      synthRef.current.removeEventListener(
        "voiceschanged",
        handleVoicesChanged
      );
    };
  }, []);

  const loadVoices = () => {
    const voices = synthRef.current
      .getVoices()
      .filter((voice) => voice.lang.includes("en"));
    setVoices(voices);
    if (voices.length > 0 && !selectedVoice) {
      setSelectedVoice(voices[0].name);
    }
  };

  const getArticleText = () => {
    const article = document.querySelector(".blog-post-content");
    return article?.textContent || "";
  };

  const handlePlayPause = () => {
    if (!synthRef.current.speaking && !isPaused) {
      startPlayback();
    } else if (isPaused) {
      resumePlayback();
    } else {
      pausePlayback();
    }
  };

  const startPlayback = () => {
    const text = getArticleText();
    if (!text) {
      setStatus("No content available to read");
      return;
    }

    stopPlayback();

    utteranceRef.current = new SpeechSynthesisUtterance(text);
    utteranceRef.current.voice = voices.find((v) => v.name === selectedVoice);
    utteranceRef.current.rate = speed;
    utteranceRef.current.pitch = pitch;
    utteranceRef.current.volume = volume;

    utteranceRef.current.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
      setStatus("Reading...");
    };

    utteranceRef.current.onend = () => {
      resetPlayback();
      setStatus("Playback completed");
    };

    synthRef.current.speak(utteranceRef.current);
  };

  const pausePlayback = () => {
    synthRef.current.pause();
    setIsPaused(true);
    setStatus("Paused");
  };

  const resumePlayback = () => {
    synthRef.current.resume();
    setIsPaused(false);
    setStatus("Resuming...");
  };

  const stopPlayback = () => {
    synthRef.current.cancel();
    resetPlayback();
    setStatus("Playback stopped");
  };

  const resetPlayback = () => {
    setIsPlaying(false);
    setIsPaused(false);
  };

  const handleVoiceOpetions = () => {
    setVoiceOpetions(!voiceOpetions);
  }

  const saveSettings = () => {
    localStorage.setItem("selectedVoice", selectedVoice);
    localStorage.setItem("speed", speed);
    localStorage.setItem("pitch", pitch);
    localStorage.setItem("volume", volume);
  };

  return (
    <div className="">
      <div className="flex flex-wrap gap-4 items-center">
        <button
          onClick={() => { handlePlayPause(); handleVoiceOpetions(); }}
          // className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {isPlaying && !isPaused ? <Pause size={18} /> : <Volume2 size={18} />}
        </button>
        {voiceOpetions && (
          
          <button
          onClick={() => {stopPlayback(); handleVoiceOpetions();}}
          // className="p-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
          <StopCircle size={18} />
        </button>
        )}
    {!voiceOpetions && (
      <button
      onClick={() => setShowSettings(!showSettings)}
      // className="p-2 bg-gray-300 rounded-md hover:bg-gray-400"
      >
          <SlidersHorizontal  size={18} />
        </button>
        )}
      </div>

      {showSettings && (
        <div className="mt-4 p-4 border rounded-lg bg-white">
          <label className="block text-sm font-medium">Voice</label>
          <select
            value={selectedVoice}
            onChange={(e) => setSelectedVoice(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            {voices.map((voice) => (
              <option key={voice.name} value={voice.name}>
                {voice.name} ({voice.lang})
              </option>
            ))}
          </select>

          <label className="block mt-2 text-sm font-medium">Speed</label>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={speed}
            onChange={(e) => setSpeed(parseFloat(e.target.value))}
            className="w-full"
          />
          <span>{speed.toFixed(1)}x</span>

          <label className="block mt-2 text-sm font-medium">Pitch</label>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={pitch}
            onChange={(e) => setPitch(parseFloat(e.target.value))}
            className="w-full"
          />
          <span>{pitch.toFixed(1)}</span>

          <label className="block mt-2 text-sm font-medium">Volume</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-full"
          />
          <span>{volume.toFixed(1)}</span>

            <div className=" flex justify-end">

          <button
            // onClick={saveSettings}
            onClick={() => { setShowSettings(!showSettings); saveSettings(); }}
            
            className=" mt-2 p-2 bg-green-600 text-white text-xs rounded-md hover:bg-green-700"
            >
            Save Settings
          </button>
            </div>
        </div>
      )}

      <div className="mt-4 text-sm text-gray-600" aria-live="polite">
        {status}
      </div>
    </div>
  );
};

export default VoiceReader;
