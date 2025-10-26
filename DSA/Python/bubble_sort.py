# Description : Implementation of Bubble Sort algorithm in Python

def main():
    n = int(input("Enter number of elements: "))
    arr = []

    print(f"Enter {n} elements:")
    for _ in range(n):
        element = int(input())
        arr.append(element)

    for i in range(n - 1):
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                # Pythonic swap
                arr[j], arr[j + 1] = arr[j + 1], arr[j]

    print("Sorted array: ", end="")
    # Print elements on the same line
    for i in range(n):
        print(arr[i], end=" ")
    print()


if __name__ == "__main__":
    main()
