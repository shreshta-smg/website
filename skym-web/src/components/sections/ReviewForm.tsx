"use client";
import { newReview } from "@/lib/client";
import { FeedbackCategory, services } from "@/lib/types";
import { useState, useRef, useEffect } from "react";

const ReviewForm = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    reviewer_name: "",
    reviewer_email: "",
    reviewer_phone: "",
    comment: "",
    title: "",
    category: FeedbackCategory.None,
    profession: "",
    rating: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    try {
      const {
        reviewer_name,
        reviewer_email,
        reviewer_phone,
        title,
        comment,
        category,
        rating,
        profession,
      } = formData;
      await newReview({
        full_name: reviewer_name,
        email_address: reviewer_email,
        phone_number: reviewer_phone,
        title: title,
        comment: comment,
        feedback_category: category,
        rating: rating,
        profession: profession,
        created_at: "",
        feedback_type: 1,
        id: 0,
        is_approved: false,
      });
      setSubmitStatus("success");
      setFormData({
        reviewer_name: "",
        reviewer_email: "",
        reviewer_phone: "",
        title: "",
        comment: "",
        category: 0,
        rating: 0,
        profession: "",
      });
    } catch (_) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }
  };

  function resetReviewForm(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void {
    setFormData({
      reviewer_name: "",
      reviewer_email: "",
      reviewer_phone: "",
      title: "",
      comment: "",
      category: 0,
      rating: 0,
      profession: "",
    });
  }

  return (
    <section id="review" ref={sectionRef} className="bg-base-100 flex">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div
          className={`text-center mb-8 transition-all duration-700 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-2 gradient-text">
            Reviews
          </h2>
          <p className="text-xl text-base-content/80 max-w-3xl mx-auto leading-relaxed">
            Tell Us What Moved You Today?
          </p>
        </div>

        <div className="grid gap-12 items-center-safe">
          {/* Contact Form */}
          <div
            className={`transition-all duration-700 delay-300 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
          >
            <div className="card  shadow-xl">
              <div className="card-body">
                <h3 className="card-title text-2xl mb-6">Review Form</h3>

                {submitStatus === "success" && (
                  <div className="alert alert-success mb-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="stroke-current shrink-0 h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>Thank you! Your review has been sent submitted.</span>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="alert alert-error mb-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="stroke-current shrink-0 h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>
                      Sorry, there was an error sending your message. Please try
                      again.
                    </span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold">Name *</span>
                      </label>
                      <input
                        type="text"
                        name="reviewer_name"
                        value={formData.reviewer_name}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                        className="input input-bordered w-full focus:input-primary"
                        required
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold">
                          Email *
                        </span>
                      </label>
                      <input
                        type="email"
                        name="reviewer_email"
                        value={formData.reviewer_email}
                        onChange={handleInputChange}
                        placeholder="your@email.com"
                        className="input input-bordered w-full focus:input-primary"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold">
                          Phone Number *
                        </span>
                      </label>
                      <input
                        type="tel"
                        name="reviewer_phone"
                        value={formData.reviewer_phone}
                        onChange={handleInputChange}
                        placeholder="Your phone number"
                        className="input input-bordered w-full focus:input-primary"
                        required
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold">
                          Category
                        </span>
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="select select-bordered w-full focus:select-primary"
                      >
                        <option value="">Select an review category</option>
                        {services.map((service) => (
                          <option
                            key={service.toLowerCase()}
                            value={services.indexOf(service)}
                          >
                            {service.toUpperCase()}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <section className="grid md:grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold">
                          Profession
                        </span>
                      </label>
                      <input
                        type="text"
                        name="profession"
                        value={formData.profession}
                        onChange={handleInputChange}
                        placeholder="Your profession... e.g. Doctor, Engineer etc."
                        className="input input-bordered w-full focus:input-primary"
                        required
                      />
                    </div>
                    <div className="form-control p-6">
                      <label className="label" htmlFor="rating">
                        <span className="label-text">Rating: </span>
                        <div className="rating rating-lg ml-4">
                          {[1, 2, 3, 4, 5].map((starValue) => (
                            <input
                              key={starValue}
                              type="radio"
                              name="rating" // Use the name prop for the radio group
                              className={`mask mask-star-2 bg-warning peer ${
                                formData.rating >= starValue
                                  ? "peer-checked:bg-green-500"
                                  : "group-hover:bg-green-500"
                              }`}
                              value={starValue}
                              onChange={handleInputChange} // Pass the starValue directly
                              aria-label={`${starValue} star`}
                            />
                          ))}
                        </div>
                      </label>
                    </div>
                  </section>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Subject</span>
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Subject of your review"
                      className="input input-bordered w-full focus:input-primary"
                      required
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">
                        Message *
                      </span>
                    </label>
                    <textarea
                      name="comment"
                      value={formData.comment}
                      onChange={handleInputChange}
                      placeholder="Tell us more about your experience..."
                      className="textarea textarea-bordered h-32 w-full focus:textarea-primary resize-none"
                      required
                    />
                  </div>

                  <div className="form-control flex justify-between">
                    <button
                      onClick={resetReviewForm}
                      className="btn btn-secondary btn-md"
                    >
                      Reset
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-accent btn-md btn-animate"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="loading loading-spinner loading-sm"></span>
                          Sending...
                        </>
                      ) : (
                        <>
                          Submit Review
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 ml-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                            />
                          </svg>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewForm;
