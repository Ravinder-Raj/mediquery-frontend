import { useCallback } from "react";

import { useDropzone } from "react-dropzone";

import { motion } from "framer-motion";

import {
  FiUploadCloud,
  FiLoader,
} from "react-icons/fi";

import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";

import { v4 as uuidv4 } from "uuid";

import { useDispatch } from "react-redux";

import { setSession } from "../../features/chat/chatSlice";

import { useUploadPdfMutation } from "../../services/api";

export default function UploadBox() {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [uploadPdf, { isLoading }] =
    useUploadPdfMutation();

  const onDrop = useCallback(async (acceptedFiles) => {

    const file = acceptedFiles[0];

    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("Only PDF files are allowed");
      return;
    }

    // ✅ Generate session ID here so we can pass it to upload
    const sessionId = uuidv4();

    try {

      toast.loading("Processing medical document...", {
        id: "upload",
      });

      // ✅ Pass both file and sessionId
      await uploadPdf({ file, sessionId }).unwrap();

      dispatch(setSession(sessionId));

      toast.success(
        "Medical PDF uploaded successfully",
        {
          id: "upload",
        }
      );

      setTimeout(() => {
        navigate("/chat");
      }, 1200);

    } catch (error) {

      console.error(error);

      toast.error("Upload failed", {
        id: "upload",
      });
    }

  }, [uploadPdf, navigate, dispatch]);

  const { getRootProps, getInputProps, isDragActive } =
    useDropzone({
      onDrop,
      multiple: false,
    });

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="mt-20"
    >
      <motion.div
        animate={{
          borderColor: isLoading
            ? ["#06b6d4", "#3b82f6", "#06b6d4"]
            : "#3f3f46",
        }}

        transition={{
          repeat: Infinity,
          duration: 2,
        }}

        {...getRootProps()}

        className={`
          relative overflow-hidden
          border-2 border-dashed rounded-3xl p-14
          transition-all duration-300 cursor-pointer
          bg-zinc-900/50 backdrop-blur-xl
          
          ${
            isDragActive
              ? "bg-cyan-500/10"
              : "hover:border-cyan-500"
          }
        `}
      >
        <input {...getInputProps()} />

        {/* Animated Glow */}
        {
          isLoading && (
            <motion.div
              animate={{
                x: ["-100%", "100%"],
              }}

              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "linear",
              }}

              className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent"
            />
          )
        }

        <div className="flex flex-col items-center text-center relative z-10">

          <motion.div
            animate={
              isLoading
                ? {
                    rotate: 360,
                  }
                : {}
            }

            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "linear",
            }}

            className="w-20 h-20 rounded-3xl bg-cyan-500/10 flex items-center justify-center mb-6"
          >
            {
              isLoading ? (
                <FiLoader className="text-5xl text-cyan-400" />
              ) : (
                <FiUploadCloud className="text-5xl text-cyan-400" />
              )
            }
          </motion.div>

          <h3 className="text-2xl font-bold">

            {
              isLoading
                ? "Analyzing Medical Document..."
                : "Upload Medical PDF"
            }

          </h3>

          <p className="text-zinc-400 mt-3 max-w-lg leading-relaxed">

            {
              isLoading
                ? "Generating embeddings, indexing vectors, and preparing AI context..."
                : "Drag and drop your medical document here, or click to browse files."
            }

          </p>

          <div className="mt-8 text-sm text-zinc-500">

            {
              isLoading
                ? "This may take 20-40 seconds on free infrastructure"
                : "Supports PDF files only"
            }

          </div>

        </div>
      </motion.div>
    </motion.div>
  );
}