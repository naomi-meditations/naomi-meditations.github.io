import argparse
import json
from silero_vad import load_silero_vad, read_audio, get_speech_timestamps

def get_non_silence_segments(audio_path, gap_threshold_sec=10.0):
    model = load_silero_vad()
    sampling_rate = 16000
    wav = read_audio(audio_path, sampling_rate=sampling_rate)
    segments = get_speech_timestamps(
        wav, 
        model, 
        sampling_rate=sampling_rate,
        min_silence_duration_ms=int(gap_threshold_sec * 1000),
        return_seconds=True
    )
    
    formatted_results = [
        [round(s['start'], 2), round(s['end'], 2)] 
        for s in segments
    ]
    
    return formatted_results


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("audio_file", type=str)
    args = parser.parse_args()

    try:
        results = get_non_silence_segments(args.audio_file)
        print(json.dumps(results))
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    main()