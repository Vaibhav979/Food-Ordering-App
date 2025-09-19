import React from "react";
import { useForm } from "react-hook-form";

const Signup = () => {
  return (
    <>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>Userame:</label>
            <input
              {...register("username", {
                required: true,
                minLength: {
                  value: 3,
                  message: " Minimum length should be 3 characters",
                },
                maxLength: {
                  value: 6,
                  message: "max length atmost 6 characters",
                },
                pattern: {
                  value: /^[A-Za-z]+$/i,
                  message: "Only alphabets are allowed",
                },
              })}
            />
            {errors.username && (
              <p style={{ color: "red", background: "gray" }}>
                {errors.username.message}
              </p>
            )}
          </div>
          <br />
          <label>Email:</label>
          <input {...register("email")} />
          <br />
          <label>Password:</label>
          <input {...register("password")} />
          <br />
          <input
            type="submit"
            disabled={isSubmitting}
            value={isSubmitting ? "Submitting" : "Submit"}
          />
        </form>
      </div>
    </>
  );
};

export default Signup;
