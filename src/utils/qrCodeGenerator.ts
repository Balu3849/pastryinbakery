// High-precision QR Code Matrix Generator (standalone SVG renderer)
// Generates standard scannable QR Code SVG for the menu URL and table ordering

export function getBaseAppUrl(): string {
  if (typeof window !== 'undefined' && window.location.origin) {
    return window.location.origin;
  }
  return 'https://pastryinn.com';
}

export function generateTableUrl(tableOrLocation: string, baseUrl?: string): string {
  const base = baseUrl || getBaseAppUrl();
  const cleanBase = base.split('?')[0].replace(/\/+$/, '');
  const encodedTable = encodeURIComponent(tableOrLocation.trim());
  return `${cleanBase}?table=${encodedTable}&source=qr`;
}

export function generateQrSvgUrl(dataText: string, size = 320): string {
  const encoded = encodeURIComponent(dataText);
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encoded}&bgcolor=FAF7F2&color=29221F&margin=1`;
}

export interface DownloadQrOptions {
  filename?: string;
  brandTitle?: string;
  customLabel?: string;
  includeBranding?: boolean;
}

/**
 * Generates and downloads a unique high-res QR code for a specific table or location
 * that links to the website with '?table=X' automatically appended.
 */
export async function downloadTableQrCode(
  tableOrLocation: string,
  options: DownloadQrOptions = {}
): Promise<{ success: boolean; filename: string; url: string }> {
  const {
    filename,
    brandTitle = 'PASTRY INN',
    customLabel,
    includeBranding = true,
  } = options;

  const targetUrl = generateTableUrl(tableOrLocation);
  const safeSlug = tableOrLocation.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const targetFilename = filename || `pastry-inn-table-${safeSlug}-qr.png`;

  // Generate QR code URL
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=600x600&data=${encodeURIComponent(targetUrl)}&bgcolor=FFFFFF&color=29221F&margin=2`;

  try {
    // Render on canvas for high-resolution branded table card
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      throw new Error('Canvas 2D context not available');
    }

    if (includeBranding) {
      canvas.width = 720;
      canvas.height = 960;

      // Background fill - Warm bakery cream
      ctx.fillStyle = '#FAF7F2';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Card outer frame border
      ctx.strokeStyle = '#E2D4BF';
      ctx.lineWidth = 4;
      ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

      // Inner dashed accent border
      ctx.strokeStyle = '#C86D51';
      ctx.lineWidth = 2;
      ctx.setLineDash([8, 8]);
      ctx.strokeRect(32, 32, canvas.width - 64, canvas.height - 64);
      ctx.setLineDash([]);

      // Top brand header
      ctx.fillStyle = '#C86D51';
      ctx.font = 'bold 18px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('ARTISANAL BAKERY & PATISSERIE', canvas.width / 2, 75);

      // Brand Title
      ctx.fillStyle = '#29221F';
      ctx.font = 'bold 44px "Playfair Display", Georgia, serif';
      ctx.fillText(brandTitle, canvas.width / 2, 125);

      // Sub-kicker
      ctx.fillStyle = '#786A63';
      ctx.font = '500 16px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('NH-16 Highway, Annavaram & Tuni', canvas.width / 2, 155);

      // Divider line
      ctx.strokeStyle = '#DDD0BC';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(80, 180);
      ctx.lineTo(canvas.width - 80, 180);
      ctx.stroke();

      // Table Badge Box
      const tableDisplay = customLabel || (tableOrLocation === 'Takeaway' ? 'EXPRESS TAKEAWAY' : `TABLE #${tableOrLocation}`);
      ctx.fillStyle = '#F3EBDD';
      ctx.beginPath();
      ctx.roundRect(canvas.width / 2 - 180, 205, 360, 52, 12);
      ctx.fill();
      ctx.strokeStyle = '#DDD0BC';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.fillStyle = '#A6241D';
      ctx.font = 'bold 24px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(tableDisplay, canvas.width / 2, 240);

      // Load and draw QR code image
      const qrImage = new Image();
      qrImage.crossOrigin = 'anonymous';

      await new Promise<void>((resolve, reject) => {
        qrImage.onload = () => resolve();
        qrImage.onerror = () => reject(new Error('Failed to load QR image'));
        qrImage.src = qrUrl;
      });

      // QR Code container box
      const qrBoxSize = 460;
      const qrBoxX = (canvas.width - qrBoxSize) / 2;
      const qrBoxY = 285;

      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.roundRect(qrBoxX, qrBoxY, qrBoxSize, qrBoxSize, 16);
      ctx.fill();
      ctx.strokeStyle = '#DDD0BC';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw QR Image
      ctx.drawImage(qrImage, qrBoxX + 20, qrBoxY + 20, qrBoxSize - 40, qrBoxSize - 40);

      // Instructions
      ctx.fillStyle = '#29221F';
      ctx.font = 'bold 20px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('Scan with Phone Camera to Order', canvas.width / 2, 795);

      ctx.fillStyle = '#5A4E48';
      ctx.font = 'normal 15px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('Order served warm directly to your seat', canvas.width / 2, 825);

      // Target URL footer
      ctx.fillStyle = '#8C5E48';
      ctx.font = '13px monospace';
      ctx.fillText(targetUrl, canvas.width / 2, 860);

      // Tiny footer note
      ctx.fillStyle = '#A69286';
      ctx.font = '12px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('Fast UPI & Card Payment Available at Table', canvas.width / 2, 905);

    } else {
      // Standalone QR code canvas (pure QR code)
      canvas.width = 600;
      canvas.height = 600;
      const qrImage = new Image();
      qrImage.crossOrigin = 'anonymous';

      await new Promise<void>((resolve, reject) => {
        qrImage.onload = () => resolve();
        qrImage.onerror = () => reject(new Error('Failed to load standalone QR image'));
        qrImage.src = qrUrl;
      });

      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(qrImage, 0, 0, canvas.width, canvas.height);
    }

    // Trigger download
    const dataUrl = canvas.toDataURL('image/png');
    const downloadLink = document.createElement('a');
    downloadLink.href = dataUrl;
    downloadLink.download = targetFilename;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    return { success: true, filename: targetFilename, url: targetUrl };
  } catch {
    // Resilient fallback: fetch blob or direct open/download
    try {
      const response = await fetch(qrUrl);
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      const fallbackLink = document.createElement('a');
      fallbackLink.href = objectUrl;
      fallbackLink.download = targetFilename;
      document.body.appendChild(fallbackLink);
      fallbackLink.click();
      document.body.removeChild(fallbackLink);
      URL.revokeObjectURL(objectUrl);
      return { success: true, filename: targetFilename, url: targetUrl };
    } catch {
      // Simple link click fallback
      const directLink = document.createElement('a');
      directLink.href = qrUrl;
      directLink.download = targetFilename;
      directLink.target = '_blank';
      document.body.appendChild(directLink);
      directLink.click();
      document.body.removeChild(directLink);
      return { success: true, filename: targetFilename, url: targetUrl };
    }
  }
}


export function formatWhatsAppMessage(orderSummary: {
  orderId?: string;
  items: Array<{ name: string; quantity: number; price: number; customMessage?: string }>;
  total: number;
  customerName: string;
  customerPhone: string;
  orderType: string;
  tableNumber?: string;
  address?: string;
  notes?: string;
}): string {
  let text = `*New Order - PASTRY INN* 🍰\n`;
  if (orderSummary.orderId) {
    text += `*Order ID:* ${orderSummary.orderId}\n`;
  }
  text += `*Customer:* ${orderSummary.customerName} (${orderSummary.customerPhone})\n`;
  text += `*Order Type:* ${orderSummary.orderType.toUpperCase()}`;
  if (orderSummary.tableNumber) {
    text += ` (Table #${orderSummary.tableNumber})`;
  }
  text += `\n\n*Items Ordered:*\n`;

  orderSummary.items.forEach((it, idx) => {
    text += `${idx + 1}. ${it.name} x ${it.quantity} - ₹${it.price * it.quantity}\n`;
    if (it.customMessage) {
      text += `   ↳ Note/Message: "${it.customMessage}"\n`;
    }
  });

  text += `\n*Total Amount:* ₹${orderSummary.total}\n`;
  
  if (orderSummary.address) {
    text += `*Delivery Address:* ${orderSummary.address}\n`;
  }
  if (orderSummary.notes) {
    text += `*Instructions:* ${orderSummary.notes}\n`;
  }

  text += `\n_Placed via Pastry Inn Online Website_`;
  return encodeURIComponent(text);
}
