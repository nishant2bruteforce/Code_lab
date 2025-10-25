#OOPS

"""class Person:
    def __init__(self,name,age):
        self.name = name
        self.age=age
    def greet(self):
        print(f"Hello my name is {self.name}and I am {self.age} years old.")

p1 = Person("Alice",25)
p1.greet()
"""
#ACCESS MODIFIER
"""
| Access Level | Syntax  | Meaning                             |
| ------------ | ------- | ----------------------------------- |
| Public       | `var`   | Accessible from anywhere            |
| Protected    | `_var`  | Meant for internal use (subclasses) |
| Private      | `__var` | Name mangling to make truly private |

"""
#ENCAPSULATION

#The practice of bundling related data into a structured unit, along with the methods used to work with that data.
"""
class Bank:
    def __init__(self,balance):
        self.__balance = balance
    def deposit(self, amount):
         if amount > 0:
            self.__balance += amount
    def get_balance(self):
        return self.__balance
    
acc = Bank(1000)
acc.deposit(500)

class Student:
    def __init__(self, name, marks):
        self.__name = name       # private
        self.__marks = marks     # private

    def get_name(self):
        return self.__name

    def set_name(self, name):
        if name != "":
            self.__name = name
        else:
            print("Invalid name")

    def get_marks(self):
        return self.__marks

    def set_marks(self, marks):
        if 0 <= marks <= 100:
            self.__marks = marks
        else:
            print("Invalid marks")

# Usage
s1 = Student("Amit", 88)
print(s1.get_name())   
s1.set_marks(95)        
print(s1.get_marks()) 

s1.set_marks(120)    


"""

                                        #INHERITENCE
class Animal:
    def __init__(self,name):
        self.name= name
    def speak(self):
        print(f"{self.name} can speak")

class Cat(Animal):
    def speak(self):
        print(f"{self.name} mews")

class Dog(Animal):
    def speak(self):
        print(f"{self.name} barks")

dog = Dog(Animal)
cat = Cat(Animal)

"""
Type          	Description

Single          Inheritance	One child class inherits from one parent class 
                                    A->B

Multiple	    One class inherits from multiple parent classes
                                 A  B  C
                                 \  |  /
                                    D

Multilevel	    Inheritance in a chain 
                         (A → B → C)
Hierarchical	Multiple children from one parent 

                                            A
                                          / | \
                                        B   C  D
"""

                                             #POLYMORPHISM

#Polymorphism means "many forms" — the ability to use the same method name across different classes with different behavior.
class Circle:
    def area(self):
        return 3.14 * 5 * 5

class Square:
    def area(self):
        return 4 * 4

# Same interface, different implementation
shapes = [Circle(), Square()]

for shape in shapes:
    print("Area:", shape.area())


                                                     #ABSTRACTION

#Abstraction means hiding internal implementation details and showing only the essential features to the user
"""
Term	                  Description
ABC	                      Abstract Base Class
@abstractmethod	          Decorator marking methods that must be overridden
Can't Instantiate	      You cannot create objects from abstract classes directly

"""

from abc import ABC, abstractmethod
class Animal(ABC):
    @abstractmethod
    def make_sound(self):
        pass

class Dog(Animal):
    def make_sound(self):
        print("Bark")

class Cat(Animal):
    def make_sound(self):
        print("Meow")

dog = Dog()
cat = Cat()

dog.make_sound()
cat.make_sound() 