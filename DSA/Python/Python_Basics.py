import math

#Searching Algorithms
                            
"""
                                            #Linear Search
if a in num:
    print("It is present at index", num.index(a))
else:
    print("Not present")
    """
                                              #Binary Search

"""def binary_search(arr, target):
    low = 0
    high = len(arr) - 1

    while low <= high:
        mid = (low + high) // 2

        if arr[mid] == target:
            return mid 
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1 """ 
arr= [1, 2, 3, 45, 6, 7, 8, 9]
sum=0
for i in (arr):sum =sum+i
print(arr.append(0))

                                               #Bubble_sort
"""
n =len(arr)
def bubble_sort(arr):
    for i in range(n):
        for j in range(0,i-n-1):
            if arr[j]>arr[j+1]:
                temp = arr[j]
                arr[j+1] = arr[j]
                arr[j]=temp
    return arr
"""
                                  #Merge_sort
"""
def merge_sort(arr):
    if len(arr)<=1:
        return arr
    mid = len(arr)//2
    left =merge_sort(arr[:mid])
    right =merge_sort(arr[mid:])
    return merge(left,right)
    
def merge(left,right):
    merged = []
    i=j=0
    while i<len(left) and j<len(right):
        if left[i]<right[j]:
            merged.append(left[i])
            i+=1
        else:
            merged.append(right[j])
            j+=1
    merged.extend(left[i:])
    merged.extend(right[j:])
    return merged"""

                                           #LINKED LIST

#[]->[]->[]->
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None

    def append(self,data):
        new_node = Node(data)
        if not self.head:
            self.head = new_node
            return
        last = self.head
        while last.next:
            last = last.next
        last.next = new_node

    def display(self):
        temp = self.head
        while temp:
            print(temp.data, end=' -> ')
            temp = temp.next
        print('None')