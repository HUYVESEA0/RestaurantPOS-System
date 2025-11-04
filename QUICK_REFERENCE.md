# 🚀 Quick Reference Card - Restaurant POS Scripts

## ⚡ Super Quick Start

```batch
setup.bat && run-all.bat
```

## 📜 Available Commands

### 🔧 Setup & Development

| Command | Description | When to use |
|---------|-------------|-------------|
| `setup.bat` | Setup dự án | Lần đầu clone |
| `run-all.bat` | Chạy cả 2 servers | Development thường |
| `run-backend.bat` | Chỉ API | Test backend |
| `run-frontend.bat` | Chỉ React | Test frontend |
| `stop-all.bat` | Dừng tất cả | Cleanup |

### 📚 Alternative (PowerShell)

| Command | Description |
|---------|-------------|
| `.\setup.ps1` | Setup dự án |
| `.\run-all.ps1` | Chạy cả 2 servers |
| `.\run-backend.ps1` | Chỉ API |
| `.\run-frontend.ps1` | Chỉ React |

## 🌐 URLs

| Service | URL | Notes |
|---------|-----|-------|
| Frontend | http://localhost:3000 | Main UI |
| Backend API | https://localhost:7000 | API endpoints |
| Swagger UI | https://localhost:7000/swagger | API docs |

## 👤 Default Login

```
Username: admin
Password: Admin@123
```

## 🔄 Typical Workflow

### First Time
```batch
1. setup.bat          # ⏱️ ~2-3 minutes
2. run-all.bat        # 🚀 Start servers
3. http://localhost:3000  # 🌐 Open browser
4. stop-all.bat       # 🛑 When done
```

### Daily Development
```batch
run-all.bat       # Start
[work on code]
stop-all.bat     # Stop
```

## 🐛 Quick Fixes

### Script won't run
```batch
# Run as Administrator
Right-click → "Run as administrator"
```

### Port already in use
```batch
netstat -ano | findstr :7000
taskkill /PID <PID> /F
```

### Database error
```batch
dotnet ef database drop --project RestaurantPOS.API
setup.bat
```

### npm error
```batch
cd restaurant-pos-client
rmdir /s /q node_modules
del package-lock.json
npm install
```

## 📖 Documentation

| File | Purpose |
|------|---------|
| [README.md](README.md) | Project overview |
| [QUICKSTART.md](doc/QUICKSTART.md) | Detailed setup |
| [BATCH_SCRIPTS_GUIDE.md](BATCH_SCRIPTS_GUIDE.md) | Scripts guide |

## 🎯 Pro Tips

1. **Always `setup.bat` first** on new clone
2. **Use `run-all.bat`** for convenience
3. **Check console** for errors
4. **Use `stop-all.bat`** for clean shutdown
5. **Keep both windows open** to see logs

## 🔑 Keyboard Shortcuts

- `Ctrl+C` - Stop current server
- `Ctrl+Shift+F5` - Hard refresh browser (clear cache)
- `F12` - Open browser DevTools
- `Ctrl+K, Ctrl+C` - Comment in VS Code
- `Ctrl+/` - Toggle comment

## 📞 Need Help?

- Check [BATCH_SCRIPTS_GUIDE.md](BATCH_SCRIPTS_GUIDE.md) for troubleshooting
- Check [QUICKSTART.md](doc/QUICKSTART.md) for detailed steps
- Open issue on GitHub

---

**Print this card and keep it handy!** 📌
