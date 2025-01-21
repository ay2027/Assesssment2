import tkinter as tk
from tkinter import messagebox
import requests
import random

class TriviaApp:
    def __init__(self, root):
        # Set the window title and size
        self.root = root
        self.root.title("Open Trivia Quiz")
        self.root.geometry("620x388")
        self.root.resizable(False, False)

        # Load background image
        self.background_image = tk.PhotoImage(file="Sky_background.png") 
        self.background_label = tk.Label(root, image=self.background_image)
        self.background_label.place(relwidth=1, relheight=1)  

        # Initialize variables
        self.question = ""
        self.correct_answer = ""
        self.options = []

        # Create GUI elements
        self.title_label = tk.Label(
            root, text="Open Trivia Quiz", font=("Arial", 24, "bold"), bg="#ffffff", fg="#000000"
        )
        self.title_label.place(x=200, y=10)

        self.category_label = tk.Label(root, text="Category:", font=("Arial", 14), bg="#ffffff")
        self.category_label.place(x=100, y=80)

        self.category_var = tk.StringVar(value="9")
        self.category_menu = tk.OptionMenu(
            root, self.category_var, "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32"
        )
        self.category_menu.config(font=("Arial", 12))
        self.category_menu.place(x=190, y=80)

        self.difficulty_label = tk.Label(root, text="Difficulty:", font=("Arial", 14), bg="#ffffff")
        self.difficulty_label.place(x=370, y=80)

        self.difficulty_var = tk.StringVar(value="any")
        self.difficulty_menu = tk.OptionMenu(root, self.difficulty_var, "any", "easy", "medium", "hard")
        self.difficulty_menu.config(font=("Arial", 12))
        self.difficulty_menu.place(x=450, y=80)

        self.fetch_question_button = tk.Button(
            root, text="Fetch Question", font=("Arial", 14), command=self.fetch_question
        )
        self.fetch_question_button.place(x=250, y=120)

        self.question_label = tk.Label(
            root, text="", wraplength=500, justify="center", font=("Arial", 16), bg="#ffffff"
        )
        self.question_label.place(x=60, y=180)

        self.options_frame = tk.Frame(root, bg="#ffffff")
        self.options_frame.place(x=100, y=250)

        self.option_buttons = []
        for i in range(4):
            btn = tk.Button(
                self.options_frame,
                text="",
                width=20,
                font=("Arial", 12),
                command=lambda i=i: self.check_answer(i),
            )
            
            btn.grid(row=i // 2, column=i % 2, padx=10, pady=5)
            self.option_buttons.append(btn)


    def fetch_question(self):
        category = self.category_var.get()
        difficulty = self.difficulty_var.get()

        url = "https://opentdb.com/api.php?amount=1"
        if category != "any":
            url += f"&category={category}"
        if difficulty != "any":
            url += f"&difficulty={difficulty}"

        response = requests.get(url)
        if response.status_code == 200:
            data = response.json()
            if data["response_code"] == 0:
                question_data = data["results"][0]
                self.display_question(question_data)
            else:
                messagebox.showerror("Error", "No questions available for the selected criteria.")
        else:
            messagebox.showerror("Error", "Failed to fetch question.")

    def display_question(self, question_data):
        self.question = question_data["question"]
        self.correct_answer = question_data["correct_answer"]
        self.options = question_data["incorrect_answers"] + [self.correct_answer]
        random.shuffle(self.options)

        self.question_label.config(text=self.question)

        for i, option in enumerate(self.options):
            self.option_buttons[i].config(text=option)

    def check_answer(self, selected_index):
        selected_answer = self.options[selected_index]
        if selected_answer == self.correct_answer:
            messagebox.showinfo("Correct!", "You selected the correct answer.")
        else:
            messagebox.showerror("Incorrect", f"The correct answer was: {self.correct_answer}")
            self.fetch_question()


if __name__ == "__main__":
    root = tk.Tk()
    app = TriviaApp(root)
    root.mainloop()
