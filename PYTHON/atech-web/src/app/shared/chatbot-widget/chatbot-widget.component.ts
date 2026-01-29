import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

export enum ChatState {
    INICIO,
    PREGUNTANDO_SERVICIO,
    OFRECIENDO_LLAMADA,
    CAPTURANDO_NOMBRE,
    CAPTURANDO_EMAIL,
    CAPTURANDO_TELEFONO,
    FINALIZADO
}

@Component({
    selector: 'app-chatbot-widget',
    template: `
    <div class="chatbot-container z-5">
        <!-- Chat Window -->
        <div *ngIf="isOpen" [@slideInOut] class="chat-window surface-card shadow-8 border-round-2xl overflow-hidden flex flex-column border-1 surface-border">
            
            <!-- Header -->
            <div class="chat-header bg-gradient-primary p-3 flex align-items-center justify-content-between">
                <div class="flex align-items-center gap-2">
                    <div class="w-2rem h-2rem bg-white border-circle flex align-items-center justify-content-center">
                        <i class="pi pi-bolt text-primary font-bold"></i>
                    </div>
                    <div class="flex flex-column">
                        <span class="font-bold text-white text-sm">Atech Assistant</span>
                        <span class="text-xs text-green-300 flex align-items-center gap-1">
                            <span class="w-0.5rem h-0.5rem bg-green-300 border-circle inline-block"></span> Online
                        </span>
                    </div>
                </div>
                <div class="flex gap-2">
                    <button (click)="resetChat()" class="p-button-text p-button-rounded text-white hover:text-gray-200" title="Reiniciar"><i class="pi pi-refresh"></i></button>
                    <button (click)="toggleChat()" class="p-button-text p-button-rounded text-white hover:text-gray-200"><i class="pi pi-minus"></i></button>
                </div>
            </div>
            
            <!-- Messages Area -->
            <div #scrollContainer class="chat-messages p-3 flex-grow-1 overflow-y-auto bg-gray-900" style="scroll-behavior: smooth;">
                <div class="text-center text-gray-500 text-xs mb-3">{{ today | date:'shortTime' }}</div>
                
                <div *ngFor="let msg of messages" class="mb-3 flex animate-fade-in" [ngClass]="{'justify-content-end': msg.isUser}">
                    <div *ngIf="!msg.isUser" class="w-2rem h-2rem mr-2 bg-primary-900 border-circle flex align-items-center justify-content-center flex-shrink-0">
                        <i class="pi pi-bolt text-xs text-primary"></i>
                    </div>
                    <div class="flex flex-column" [ngClass]="{'align-items-end': msg.isUser}">
                        <div [class]="msg.isUser ? 'bg-primary text-white border-round-top-xl border-round-left-xl' : 'surface-card text-gray-100 border-round-top-xl border-round-right-xl border-1 surface-border'" 
                             class="p-3 text-sm max-w-18rem shadow-1">
                            {{ msg.text }}
                        </div>
                        <span class="text-xs text-gray-550 mt-1 opacity-60">{{ msg.timestamp | date:'HH:mm' }}</span>
                    </div>
                </div>

                <!-- Typing Indicator -->
                <div *ngIf="isTyping" class="flex align-items-center gap-1 mb-3 ml-2">
                    <span class="typing-dot"></span>
                    <span class="typing-dot"></span>
                    <span class="typing-dot"></span>
                </div>

                <!-- Quick Replies -->
                <div *ngIf="currentOptions.length > 0 && !isTyping" class="flex flex-wrap gap-2 mt-2 ml-5 animate-slide-up">
                    <button *ngFor="let opt of currentOptions" 
                            (click)="handleOptionClick(opt)"
                            class="p-button p-button-outlined p-button-sm p-button-rounded border-primary text-primary hover:bg-primary-900 hover:text-white transition-colors">
                        {{ opt }}
                    </button>
                </div>
            </div>

            <!-- Input Area -->
            <div class="chat-input p-3 surface-card border-top-1 surface-border flex gap-2">
                <input type="text" pInputText [(ngModel)]="userInput" (keyup.enter)="sendMessage()" 
                       [disabled]="currentState === ChatState.FINALIZADO"
                       placeholder="Escribe un mensaje..." 
                       class="w-full bg-gray-900 border-none text-white p-2 border-round-xl">
                <button pButton icon="pi pi-send" (click)="sendMessage()" 
                        [disabled]="!userInput.trim() || currentState === ChatState.FINALIZADO"
                        class="p-button-rounded p-button-primary"></button>
            </div>
        </div>

        <!-- Toggle Button -->
        <button (click)="toggleChat()" *ngIf="!isOpen" 
                class="chat-toggle-btn p-button-rounded p-button-primary shadow-8 w-4rem h-4rem flex align-items-center justify-content-center border-circle transition-transform hover:scale-110 cursor-pointer border-none bg-gradient-primary">
            <i class="pi pi-comment text-2xl text-white"></i>
            <span *ngIf="unreadCount > 0" class="absolute top-0 right-0 w-1.5rem h-1.5rem bg-red-500 border-circle border-2 border-white flex align-items-center justify-content-center text-xs font-bold">{{ unreadCount }}</span>
            <span *ngIf="unreadCount === 0" class="absolute top-0 right-0 w-1rem h-1rem bg-green-400 border-circle border-2 border-white"></span>
        </button>
    </div>
  `,
    styles: [`
    .chatbot-container { position: fixed; bottom: 2rem; right: 2rem; display: flex; flex-direction: column; align-items: flex-end; z-index: 1000; }
    .chat-window { width: 380px; height: 550px; margin-bottom: 1rem; backdrop-filter: blur(10px); }
    .bg-gradient-primary { background: linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%); }
    .animate-fade-in { animation: fadeIn 0.3s ease-in; }
    .animate-slide-up { animation: slideUp 0.3s ease-out; }
    
    .typing-dot {
        width: 6px; height: 6px; background: #8B5CF6; border-radius: 50%;
        animation: typing 1.4s infinite ease-in-out both;
    }
    .typing-dot:nth-child(1) { animation-delay: -0.32s; }
    .typing-dot:nth-child(2) { animation-delay: -0.16s; }
    
    @keyframes typing { 0%, 80%, 100% { transform: scale(0); } 40% { transform: scale(1); } }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes slideUp { from { transform: translateY(10px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
    
    @media (max-width: 768px) {
        .chat-window { width: 90vw; height: 70vh; right: 1rem; bottom: 5rem; }
        .chatbot-container { right: 1rem; bottom: 1rem; }
    }
  `],
    animations: [
        trigger('slideInOut', [
            transition(':enter', [
                style({ transform: 'translateY(50px) scale(0.9)', opacity: 0 }),
                animate('0.3s cubic-bezier(0.25, 0.8, 0.25, 1)', style({ transform: 'translateY(0) scale(1)', opacity: 1 }))
            ]),
            transition(':leave', [
                animate('0.2s ease-in', style({ transform: 'translateY(20px) scale(0.95)', opacity: 0 }))
            ])
        ])
    ]
})
export class ChatbotWidgetComponent implements OnInit, AfterViewChecked {
    @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

    isOpen = false;
    messages: { text: string, isUser: boolean, timestamp: Date }[] = [];
    userInput = '';
    isTyping = false;
    currentOptions: string[] = [];
    today = new Date();
    unreadCount = 0;
    private notificationSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2354/2354-preview.mp3');

    ChatState = ChatState; // Expose enum to template
    currentState: ChatState = ChatState.INICIO;

    // Data Capture
    leadData = { name: '', email: '', phone: '' };

    ngOnInit() {
        this.loadChatHistory();
    }

    private saveChatHistory() {
        const data = {
            messages: this.messages,
            currentState: this.currentState,
            leadData: this.leadData
        };
        localStorage.setItem('atech_chat_history', JSON.stringify(data));
    }

    private loadChatHistory() {
        const saved = localStorage.getItem('atech_chat_history');
        if (saved) {
            const data = JSON.parse(saved);
            this.messages = data.messages.map((m: any) => ({ ...m, timestamp: new Date(m.timestamp) }));
            this.currentState = data.currentState;
            this.leadData = data.leadData;
        } else {
            this.resetChat();
        }
    }

    ngAfterViewChecked() {
        this.scrollToBottom();
    }

    scrollToBottom(): void {
        try {
            this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
        } catch (err) { }
    }

    toggleChat() {
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            this.unreadCount = 0;
            if (this.messages.length === 0) {
                this.resetChat();
            }
            setTimeout(() => this.scrollToBottom(), 100);
        }
    }

    resetChat() {
        this.messages = [];
        this.currentState = ChatState.INICIO;
        this.leadData = { name: '', email: '', phone: '' };
        this.unreadCount = 0;
        localStorage.removeItem('atech_chat_history');
        this.addBotMessage('¡Hola! 👋 Soy el asistente virtual de Atech. ¿En qué puedo ayudarte hoy?',
            ['Ver Servicios', 'Agendar Llamada', 'Cotización', 'Hablar con Humano']);
    }

    handleOptionClick(option: string) {
        this.userInput = option;
        this.sendMessage();
    }

    sendMessage() {
        if (!this.userInput.trim()) return;

        const text = this.userInput;
        this.messages.push({ text: text, isUser: true, timestamp: new Date() });
        this.userInput = '';
        this.currentOptions = []; // Clear options after selection
        this.saveChatHistory();

        this.isTyping = true;
        setTimeout(() => {
            this.isTyping = false;
            this.processUserInput(text);
        }, 1000);
    }

    processUserInput(text: string) {
        const cleanText = text.toLowerCase().trim();

        // Global Loop Breakers
        if (cleanText.includes('reiniciar') || cleanText.includes('inicio')) {
            this.resetChat();
            return;
        }

        switch (this.currentState) {
            case ChatState.INICIO:
                this.handleInicioState(cleanText);
                break;
            case ChatState.PREGUNTANDO_SERVICIO:
                this.handleServicioState(cleanText);
                break;
            case ChatState.OFRECIENDO_LLAMADA:
            case ChatState.CAPTURANDO_NOMBRE:
                this.leadData.name = text;
                this.currentState = ChatState.CAPTURANDO_EMAIL;
                this.addBotMessage(`Encantado, ${text}. ¿Cuál es tu dirección de email?`);
                break;
            case ChatState.CAPTURANDO_EMAIL:
                this.leadData.email = text;
                this.currentState = ChatState.CAPTURANDO_TELEFONO;
                this.addBotMessage('Gracias. Por último, ¿me podrías dar tu número de teléfono?');
                break;
            case ChatState.CAPTURANDO_TELEFONO:
                this.leadData.phone = text;
                this.currentState = ChatState.FINALIZADO;
                this.addBotMessage('¡Perfecto! Un experto revisará tu caso y te contactará en menos de 24 horas. 🚀', ['Volver a empezar']);
                break;
            case ChatState.FINALIZADO:
                this.resetChat();
                break;
            default:
                this.addBotMessage('No estoy seguro de haber entendido. ¿Quieres ver nuestros servicios?', ['Ver Servicios', 'Contactar Humano']);
                break;
        }
    }

    handleInicioState(text: string) {
        if (text.includes('agendar') || text.includes('llamada') || text.includes('cotización')) {
            this.currentState = ChatState.CAPTURANDO_NOMBRE;
            this.addBotMessage('¡Excelente decisión! Para coordinar mejor, ¿cuál es tu nombre?');
        } else if (text.includes('servicio') || text.includes('web') || text.includes('app')) {
            this.currentState = ChatState.PREGUNTANDO_SERVICIO;
            this.addBotMessage('Ofrecemos Desarrollo Web, IA y Automatización. ¿Qué te interesa más?', ['Desarrollo Web', 'Inteligencia Artificial', 'Automatización']);
        } else {
            if (text.includes('si') || text.includes('hablar')) {
                this.currentState = ChatState.CAPTURANDO_NOMBRE;
                this.addBotMessage('Perfecto. Dime tu nombre para empezar.');
            } else {
                this.addBotMessage('Entiendo. ¿Te gustaría hablar directamente con un especialista?', ['Sí, hablar con alguien', 'Ver Servicios']);
            }
        }
    }

    handleServicioState(text: string) {
        this.addBotMessage('Es una de nuestras especialidades. Te recomiendo agendar una demo gratuita para ver cómo podemos ayudarte.', ['Agendar Demo', 'Más info']);
        // Wait for user to choose demo, which will trigger handleInicioState or similar if they say "Agendar Demo"
        this.currentState = ChatState.INICIO;
    }

    addBotMessage(text: string, options: string[] = []) {
        this.messages.push({ text, isUser: false, timestamp: new Date() });
        this.currentOptions = options;
        this.saveChatHistory();

        if (!this.isOpen) {
            this.unreadCount++;
            this.playNotification();
        } else {
            this.playNotification();
        }
    }

    private playNotification() {
        this.notificationSound.play().catch(e => console.log('Audio play failed:', e));
    }
}
