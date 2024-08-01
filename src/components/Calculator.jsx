import React, { useState } from "react";
import {
    FaTimes,
    FaMinus,
    FaPlus,
    FaPercent,
    FaBackspace,
    FaDivide,
    FaEquals,
    FaMoon,
    FaSun
} from "react-icons/fa";

export default function Calculator() {
    const [display, setDisplay] = useState("0");
    const [expression, setExpression] = useState("");
    const [isDarkMode, setIsDarkMode] = useState(false); // State for dark mode

    const handleNumberClick = num => {
        setDisplay(prev => (prev === "0" ? num : prev + num));
        setExpression(prev => (prev === "" ? num : prev + num));
    };

    const handleOperatorClick = op => {
        setDisplay("0");
        setExpression(prev => {
            const lastChar = prev.slice(-1);
            return lastChar === " " || lastChar === "" || !isNaN(lastChar)
                ? prev + " " + op + " "
                : prev;
        });
    };

    const handleEquals = () => {
        try {
            const result = eval(expression.replace(/[^0-9+\-*/.%]/g, ""));
            setDisplay(result.toString());
            setExpression(result.toString());
        } catch (e) {
            setDisplay("Error");
        }
    };

    const handlePercentage = () => {
        setDisplay(prev => {
            const currentNumber = parseFloat(prev);
            if (isNaN(currentNumber)) return prev;

            let newExpression = expression.trim();
            let lastOperatorIndex = newExpression.lastIndexOf(" ");

            if (lastOperatorIndex === -1) {
                const result = currentNumber / 100;
                setExpression(result.toString());
                return result.toString();
            } else {
                let base = parseFloat(
                    newExpression.slice(0, lastOperatorIndex)
                );
                let result = (base * currentNumber) / 100;
                newExpression =
                    newExpression.slice(0, lastOperatorIndex + 1) + result;
                setExpression(newExpression);
                return result.toString();
            }
        });
    };

    const handleClear = () => {
        setDisplay("0");
        setExpression("");
    };

    const handleBackspace = () => {
        setDisplay(prev => {
            const newDisplay = prev.slice(0, -1) || "0";
            setExpression(prev => prev.slice(0, -1));
            return newDisplay;
        });
    };

    const toggleTheme = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    const Button = ({ children, onClick, className = "" }) => (
        <button
            onClick={onClick}
            className={`w-full h-16 text-2xl font-semibold rounded-full flex items-center justify-center ${className}`}
        >
            {children}
        </button>
    );

    const getOperatorSymbol = op => {
        switch (op) {
            case "+":
                return <FaPlus />;
            case "-":
                return <FaMinus />;
            case "*":
                return <FaTimes />;
            case "/":
                return <FaDivide />;
            default:
                return null;
        }
    };

    return (
        <div
            className={`h-screen flex items-center justify-center ${
                isDarkMode ? "bg-gray-900" : "bg-gray-100"
            } shadow-inner`}
        >
            <div
                className={`w-full max-w-md mx-10 ${
                    isDarkMode
                        ? "bg-gray-800 text-white"
                        : "bg-white text-black"
                } rounded-3xl shadow-2xl`}
            >
                <div
                    className={`flex justify-between items-center px-4 py-2 ${
                        isDarkMode
                            ? "bg-gray-900 text-white"
                            : "bg-gray-200 text-black"
                    } rounded-t-3xl`}
                >
                    <span className="text-xl font-bold">QuickCalc</span>
                    <button
                        onClick={toggleTheme}
                        className={`p-1 rounded-full ${
                            isDarkMode
                                ? "bg-gray-700 text-white"
                                : "bg-gray-300 text-black"
                        }`}
                    >
                        {isDarkMode ? <FaSun /> : <FaMoon />}
                    </button>
                </div>

                <div className="p-6">
                    <div className="flex flex-col mb-4">
                        <div
                            className={`text-right text-xl mb-2 p-2 rounded-lg ${
                                isDarkMode ? "text-gray-400" : "text-gray-500"
                            } ${isDarkMode ? "bg-gray-700" : "bg-gray-200"}`}
                        >
                            {expression || "0"}
                        </div>
                        <div
                            className={`flex justify-between items-center text-4xl font-light h-16 overflow-hidden p-2 rounded-lg ${
                                isDarkMode ? "bg-gray-700" : "bg-gray-200"
                            }`}
                        >
                            <div className="text-right flex-grow">
                                {display}
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                        <Button
                            onClick={handleClear}
                            className={`${
                                isDarkMode
                                    ? "bg-gray-700 text-white"
                                    : "bg-gray-300 text-black"
                            }`}
                        >
                            AC
                        </Button>
                        <Button
                            onClick={handleBackspace}
                            className={`${
                                isDarkMode
                                    ? "bg-gray-700 text-white"
                                    : "bg-gray-300 text-black"
                            }`}
                        >
                            <FaBackspace />
                        </Button>
                        <Button
                            onClick={toggleTheme}
                            className={`${
                                isDarkMode
                                    ? "bg-gray-700 text-white"
                                    : "bg-gray-300 text-black"
                            }`}
                        >
                            {isDarkMode ? <FaSun /> : <FaMoon />}
                        </Button>
                        <Button
                            onClick={() => handleOperatorClick("/")}
                            className="bg-orange-500 text-white"
                        >
                            <FaDivide />
                        </Button>

                        <Button
                            onClick={() => handleNumberClick("7")}
                            className={`${
                                isDarkMode
                                    ? "bg-gray-600 text-white"
                                    : "bg-gray-200 text-black"
                            }`}
                        >
                            7
                        </Button>
                        <Button
                            onClick={() => handleNumberClick("8")}
                            className={`${
                                isDarkMode
                                    ? "bg-gray-600 text-white"
                                    : "bg-gray-200 text-black"
                            }`}
                        >
                            8
                        </Button>
                        <Button
                            onClick={() => handleNumberClick("9")}
                            className={`${
                                isDarkMode
                                    ? "bg-gray-600 text-white"
                                    : "bg-gray-200 text-black"
                            }`}
                        >
                            9
                        </Button>
                        <Button
                            onClick={() => handleOperatorClick("*")}
                            className="bg-orange-500 text-white"
                        >
                            <FaTimes />
                        </Button>

                        <Button
                            onClick={() => handleNumberClick("4")}
                            className={`${
                                isDarkMode
                                    ? "bg-gray-600 text-white"
                                    : "bg-gray-200 text-black"
                            }`}
                        >
                            4
                        </Button>
                        <Button
                            onClick={() => handleNumberClick("5")}
                            className={`${
                                isDarkMode
                                    ? "bg-gray-600 text-white"
                                    : "bg-gray-200 text-black"
                            }`}
                        >
                            5
                        </Button>
                        <Button
                            onClick={() => handleNumberClick("6")}
                            className={`${
                                isDarkMode
                                    ? "bg-gray-600 text-white"
                                    : "bg-gray-200 text-black"
                            }`}
                        >
                            6
                        </Button>
                        <Button
                            onClick={() => handleOperatorClick("-")}
                            className="bg-orange-500 text-white"
                        >
                            <FaMinus />
                        </Button>

                        <Button
                            onClick={() => handleNumberClick("1")}
                            className={`${
                                isDarkMode
                                    ? "bg-gray-600 text-white"
                                    : "bg-gray-200 text-black"
                            }`}
                        >
                            1
                        </Button>
                        <Button
                            onClick={() => handleNumberClick("2")}
                            className={`${
                                isDarkMode
                                    ? "bg-gray-600 text-white"
                                    : "bg-gray-200 text-black"
                            }`}
                        >
                            2
                        </Button>
                        <Button
                            onClick={() => handleNumberClick("3")}
                            className={`${
                                isDarkMode
                                    ? "bg-gray-600 text-white"
                                    : "bg-gray-200 text-black"
                            }`}
                        >
                            3
                        </Button>
                        <Button
                            onClick={() => handleOperatorClick("+")}
                            className="bg-orange-500 text-white"
                        >
                            <FaPlus />
                        </Button>

                        <Button
                            onClick={handlePercentage}
                            className={`${
                                isDarkMode
                                    ? "bg-gray-600 text-white"
                                    : "bg-gray-200 text-black"
                            }`}
                        >
                            <FaPercent />
                        </Button>
                        <Button
                            onClick={() => handleNumberClick("0")}
                            className={`${
                                isDarkMode
                                    ? "bg-gray-600 text-white"
                                    : "bg-gray-200 text-black"
                            }`}
                        >
                            0
                        </Button>
                        <Button
                            onClick={() => handleNumberClick(".")}
                            className={`${
                                isDarkMode
                                    ? "bg-gray-600 text-white"
                                    : "bg-gray-200 text-black"
                            }`}
                        >
                            .
                        </Button>
                        <Button
                            onClick={handleEquals}
                            className="bg-blue-500 text-white"
                        >
                            <FaEquals />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
