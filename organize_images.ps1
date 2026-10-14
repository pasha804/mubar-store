$brain = "C:\Users\USER\.gemini\antigravity-ide\brain\b8be320c-fd5e-4248-a510-722d4af1b3a8"
$base = "e:\sopify\images"

# Branding dir
New-Item -ItemType Directory -Force -Path "$base\branding" | Out-Null
Copy-Item "$brain\mj_chronos_logo_1791133366405.jpg" "$base\branding\mj_chronos_logo.jpg" -Force
Copy-Item "$brain\watch_box_design_1791131417708.jpg" "$base\branding\watch_box_unboxing.jpg" -Force

# 1. Chronograph Noir
$dir1 = "$base\products\chronograph-noir"
New-Item -ItemType Directory -Force -Path $dir1 | Out-Null
Copy-Item "$brain\chronograph_noir_watch_1791131447287.jpg" "$dir1\01-front-dial.jpg" -Force
Copy-Item "$brain\chrono_wrist_shot_1791133432138.jpg" "$dir1\02-wrist-lifestyle.jpg" -Force
Copy-Item "$brain\watch_box_design_1791131417708.jpg" "$dir1\03-unboxing-box.jpg" -Force
Copy-Item "$brain\chronograph_noir_watch_1791131447287.jpg" "$dir1\04-case-detail.jpg" -Force

# 2. Skeleton Automatique
$dir2 = "$base\products\skeleton-automatique"
New-Item -ItemType Directory -Force -Path $dir2 | Out-Null
Copy-Item "$brain\skeleton_automatic_watch_1791131484678.jpg" "$dir2\01-front-skeleton.jpg" -Force
Copy-Item "$brain\skeleton_gears_macro_1791133494716.jpg" "$dir2\02-macro-gears.jpg" -Force
Copy-Item "$brain\watch_box_design_1791131417708.jpg" "$dir2\03-unboxing-box.jpg" -Force
Copy-Item "$brain\skeleton_automatic_watch_1791131484678.jpg" "$dir2\04-leather-strap.jpg" -Force

# 3. Octa-Luxe Tiffany
$dir3 = "$base\products\octaluxe-tiffany"
New-Item -ItemType Directory -Force -Path $dir3 | Out-Null
Copy-Item "$brain\octaluxe_tiffany_watch_1791131534310.jpg" "$dir3\01-front-tiffany.jpg" -Force
Copy-Item "$brain\watch_box_design_1791131417708.jpg" "$dir3\02-unboxing-box.jpg" -Force
Copy-Item "$brain\octaluxe_tiffany_watch_1791131534310.jpg" "$dir3\03-bezel-detail.jpg" -Force
Copy-Item "$brain\octaluxe_tiffany_watch_1791131534310.jpg" "$dir3\04-steel-bracelet.jpg" -Force

# 4. Ocean Diver Submariner
$dir4 = "$base\products\ocean-diver-submariner"
New-Item -ItemType Directory -Force -Path $dir4 | Out-Null
Copy-Item "$brain\diver_submariner_watch_1791134004182.jpg" "$dir4\01-front-diver.jpg" -Force
Copy-Item "$brain\diver_submariner_watch_1791134004182.jpg" "$dir4\02-ceramic-bezel.jpg" -Force
Copy-Item "$brain\watch_box_design_1791131417708.jpg" "$dir4\03-unboxing-box.jpg" -Force
Copy-Item "$brain\diver_submariner_watch_1791134004182.jpg" "$dir4\04-oyster-clasp.jpg" -Force

# 5. Santos Square Tank
$dir5 = "$base\products\santos-square-tank"
New-Item -ItemType Directory -Force -Path $dir5 | Out-Null
Copy-Item "$brain\santos_square_tank_1791134081507.jpg" "$dir5\01-front-tank.jpg" -Force
Copy-Item "$brain\santos_square_tank_1791134081507.jpg" "$dir5\02-roman-dial.jpg" -Force
Copy-Item "$brain\watch_box_design_1791131417708.jpg" "$dir5\03-unboxing-box.jpg" -Force
Copy-Item "$brain\santos_square_tank_1791134081507.jpg" "$dir5\04-cabochon-crown.jpg" -Force

# 6. Solis Ultra-Slim
$dir6 = "$base\products\solis-ultra-slim"
New-Item -ItemType Directory -Force -Path $dir6 | Out-Null
Copy-Item "$brain\minimalist_mesh_watch_1791131604439.jpg" "$dir6\01-front-minimalist.jpg" -Force
Copy-Item "$brain\minimalist_mesh_watch_1791131604439.jpg" "$dir6\02-milanese-mesh.jpg" -Force
Copy-Item "$brain\watch_box_design_1791131417708.jpg" "$dir6\03-unboxing-box.jpg" -Force
Copy-Item "$brain\minimalist_mesh_watch_1791131604439.jpg" "$dir6\04-ultra-slim-case.jpg" -Force

# 7. Aurora Petite Femme
$dir7 = "$base\products\aurora-petite-femme"
New-Item -ItemType Directory -Force -Path $dir7 | Out-Null
Copy-Item "$brain\aurora_womens_watch_1791131673728.jpg" "$dir7\01-front-pearl.jpg" -Force
Copy-Item "$brain\aurora_womens_watch_1791131673728.jpg" "$dir7\02-diamond-cut.jpg" -Force
Copy-Item "$brain\watch_box_design_1791131417708.jpg" "$dir7\03-unboxing-box.jpg" -Force
Copy-Item "$brain\aurora_womens_watch_1791131673728.jpg" "$dir7\04-rose-gold-link.jpg" -Force

Write-Output "Organization complete!"
