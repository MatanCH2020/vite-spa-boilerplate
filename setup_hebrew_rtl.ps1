# Hebrew RTL Setup Script for Windows Terminal
# Run this script to enable proper Hebrew RTL support

# Set console to UTF-8
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
[Console]::InputEncoding = [System.Text.Encoding]::UTF8

# Display current settings
Write-Host "Current Code Page: " -NoNewline
chcp

# Set Hebrew code page
Write-Host "`nSetting Hebrew code page..."
chcp 1255

# Test Hebrew text
Write-Host "`nTesting Hebrew text:"
Write-Host "שלום עולם - Hello World"
Write-Host "זה טקסט בעברית - This is Hebrew text"

# Instructions for permanent fix
Write-Host "`n=== For Permanent Hebrew RTL Support ==="
Write-Host '1. Install Windows Terminal from Microsoft Store'
Write-Host '2. Or use the batch file created to set code page automatically'
Write-Host '3. For Git Bash: Edit ~/.bashrc and add export LANG=he_IL.UTF-8'