@echo off
schtasks /Create /TN "HalalNASDAQ_Weekly" /TR "C:\Users\chake\AppData\Local\Programs\Python\Python312\python.exe C:\Users\chake\repos\halal-nasdaq\scraper\update_weekly.py" /SC WEEKLY /D SUN /ST 06:00 /F
pause
