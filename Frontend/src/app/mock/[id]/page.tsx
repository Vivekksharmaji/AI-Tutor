'use client';

import axios from "axios";
import { usePathname, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

interface Question {
  _id: string;
  course: string;
  options: string[];
  question: string;
}

const Page = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const id = pathname.split('/').pop();  // Extract 'id' from the path
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedOption, setSelectedOption] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(true);

  const newcourse = id ? id.toString().toLowerCase() : '';

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/get-questions?course=${newcourse}`);
        setQuestions(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setLoading(false);
      }
    };

    if (id) {
      fetchQuestions();
    }
  }, [id, newcourse]);

  const handleOptionChange = (questionId: string, option: string) => {
    setSelectedOption((prevSelectedOption) => ({
      ...prevSelectedOption,
      [questionId]: option,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Save the selected options to the server or perform any necessary actions
      console.log("Selected options:", selectedOption);

      // Show success message
      Swal.fire({
        title: 'Success!',
        text: 'Your answers have been saved.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    } catch (error) {
      console.error("Error saving responses:", error);
      Swal.fire({
        title: 'Error!',
        text: 'Something went wrong while saving your answers.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-32">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-black py-12 pt-36'>
      <h1 className="text-lg md:text-7xl text-center font-sans font-bold mb-8 text-white">
        Mock Test for {newcourse}
      </h1>
      <form onSubmit={handleSubmit} className="px-20">
        {questions.map((question) => (
          <div key={question._id} className="mb-6">
            <h2 className="text-xl text-white">{question.question}</h2>
            {question.options.map((option) => (
              <div key={option} className="my-2">
                <label className="text-white">
                  <input
                    type="radio"
                    name={question._id}
                    value={option}
                    checked={selectedOption[question._id] === option}
                    onChange={() => handleOptionChange(question._id, option)}
                    className="mr-2"
                  />
                  {option}
                </label>
              </div>
            ))}
          </div>
        ))}
        <button
          type="submit"
          className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Page;
