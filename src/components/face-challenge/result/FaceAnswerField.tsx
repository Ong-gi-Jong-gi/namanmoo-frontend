interface FaceAnswerFieldProps {
  imageUrl: string | null;
}

const FaceAnswerField = ({ imageUrl }: FaceAnswerFieldProps) => {
  return (
    <div className="flex h-4/5 w-full flex-col gap-4 rounded-2xl bg-white p-4 shadow-card">
      <div className="relative flex h-full w-full flex-col items-center justify-center gap-3 overflow-hidden rounded-xl bg-paper">
        {imageUrl && (
          <div className="relative flex justify-center gap-1">
            <img src={imageUrl} alt="face-challenge-image" />
          </div>
        )}
      </div>
    </div>
  );
};

export default FaceAnswerField;
