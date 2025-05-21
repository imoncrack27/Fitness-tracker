import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";
import WorkoutForm from "./WorkoutForm";

function EditWorkoutModal({ isOpen, onClose, workout, onUpdated }) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="relative bg-white rounded-xl shadow-lg max-w-md w-full z-50 p-6">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          >
            <X size={20} />
          </button>
          <Dialog.Title className="text-xl font-bold mb-4">
            Edit Workout
          </Dialog.Title>
          <WorkoutForm
            workoutToEdit={workout}
            onWorkoutAdded={() => {
              onUpdated();
              onClose();
            }}
          />
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export default EditWorkoutModal;
