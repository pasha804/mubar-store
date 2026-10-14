$brain = "C:\Users\USER\.gemini\antigravity-ide\brain\b8be320c-fd5e-4248-a510-722d4af1b3a8"
$base = "e:\sopify\images"

# 1. Poedagar Royal Datejust
$dirDatejust = "$base\products\poedagar-royal-datejust"
New-Item -ItemType Directory -Force -Path $dirDatejust | Out-Null
Copy-Item "$brain\poedagar_royal_datejust_1791137466507.jpg" "$dirDatejust\01-front-datejust.jpg" -Force
Copy-Item "$brain\poedagar_royal_datejust_1791137466507.jpg" "$dirDatejust\02-fluted-bezel.jpg" -Force
Copy-Item "$brain\watch_box_design_1791131417708.jpg" "$dirDatejust\03-unboxing-box.jpg" -Force
Copy-Item "$brain\poedagar_royal_datejust_1791137466507.jpg" "$dirDatejust\04-jubilee-bracelet.jpg" -Force

# 2. Curren Aviator Chrono
$dirAviator = "$base\products\curren-aviator-chrono"
New-Item -ItemType Directory -Force -Path $dirAviator | Out-Null
Copy-Item "$brain\curren_aviator_chrono_1791137543102.jpg" "$dirAviator\01-front-aviator.jpg" -Force
Copy-Item "$brain\curren_aviator_chrono_1791137543102.jpg" "$dirAviator\02-subdials.jpg" -Force
Copy-Item "$brain\watch_box_design_1791131417708.jpg" "$dirAviator\03-unboxing-box.jpg" -Force
Copy-Item "$brain\curren_aviator_chrono_1791137543102.jpg" "$dirAviator\04-leather-strap.jpg" -Force

Write-Output "Budget watches added!"
