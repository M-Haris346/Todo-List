#! /usr/bin/env node
import inquirer from "inquirer";
let todos = [];
let condition = true;
function promptUser() {
    inquirer
        .prompt([
        {
            name: "todo",
            message: "Hey! What do you want to add to your todos?",
            type: "input",
        },
        {
            name: "action",
            type: "list",
            message: "Select an action:",
            choices: ["Add more", "View todos", "Delete todo", "Exit"],
        },
    ])
        .then((answers) => {
        const { todo, action } = answers;
        switch (action) {
            case "Add more":
                todos.push(todo);
                console.log("Todo added successfully.");
                promptUser();
                break;
            case "View todos":
                if (todos.length === 0) {
                    console.log("No todos added yet.");
                }
                else {
                    console.log("Your todos:");
                    todos.forEach((todo, index) => {
                        console.log(`${index + 1}. ${todo}`);
                    });
                }
                promptUser();
                break;
            case "Delete todo":
                if (todos.length === 0) {
                    console.log("No todos to delete.");
                    promptUser();
                }
                else {
                    inquirer
                        .prompt([
                        {
                            name: "index",
                            type: "input",
                            message: "Enter the index of the todo you want to delete:",
                            validate: function (value) {
                                const index = parseInt(value);
                                if (isNaN(index) || index < 1 || index > todos.length) {
                                    return `Please enter a valid index between 1 and ${todos.length}.`;
                                }
                                return true;
                            },
                        },
                    ])
                        .then((answer) => {
                        const index = parseInt(answer.index) - 1;
                        todos.splice(index, 1);
                        console.log("Todo deleted successfully.");
                        promptUser();
                    });
                }
                break;
            case "Exit":
                console.log("Thank you for making your list!!");
                condition = false;
                break;
        }
    });
}
promptUser();
